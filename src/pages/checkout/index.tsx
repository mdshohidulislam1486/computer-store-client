import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  TItems,
  addToCart,
  checkOut,
  currentCart,
  increaseCart,
  removeFromCart,
} from '../../redux/features/cart/cartSlice';
import { Button, Col, Form, Input, Row, Space } from 'antd';

import {
  DeleteOutlined,
  MinusSquareOutlined,
  PlusSquareOutlined,
} from '@ant-design/icons';
import { FormEvent, useEffect, useState } from 'react';
import { currentUserData } from '../../redux/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useSubmitOrderMutation } from '../../redux/features/product/order.apis';
import { useGetSingleCuponQuery } from '../../redux/features/cupon/cupon.apis';

const Checkout = () => {
  const navigae = useNavigate();
  const [code, setCode] = useState<string | undefined>(undefined);
  const [cuponApplied, setCuponApplied] = useState(false);
  const [discountMessage, setDiscountMessage] = useState('');
  const [submitOrder, { isSuccess }] = useSubmitOrderMutation();
  const { data, isError, isLoading, refetch } = useGetSingleCuponQuery({
    skip: code,
    code,
  });
  console.log({ data });

  const [allcost, setAllCost] = useState({
    itemCost: 0,
    total: 0,
    shipping: 0,
  });
  const [checkOutForm, setCheckOutForm] = useState({
    buyerName: '',
    shippingAddress: '',
    quantity: 0,
    shippingCost: 0,
    items: [],
    purchaseDate: new Date(),
  });

  const cart = useAppSelector(currentCart);
  const dispatch = useAppDispatch();
  const style: React.CSSProperties = {
    padding: '8px 0',
    borderTop: '1px solid #dedede',
    borderBottom: '1px solid #dedede',
  };
  const handleRemove = (itemId: string) => {
    dispatch(removeFromCart({ itemId }));
  };
  const handleQuantity = (id: string, type: string) => {
    dispatch(increaseCart({ itemId: id, type }));
  };
  const user = useAppSelector(currentUserData);
  useEffect(() => {
    const itemCost = cart?.items.reduce((acc: number, item: TItems) => {
      const cost = item.unitPrice * item.quantity;
      return cost + acc;
    }, 0);
    const shipping = itemCost * 0.015;
    const total = shipping + itemCost;

    setAllCost((prev) => ({
      ...prev,
      itemCost: itemCost,
      total,
      shipping,
    }));
    setCheckOutForm((prev) => ({
      ...prev,
      shippingCost: shipping,
      items: cart.items,
      quantity: cart.totalItem,
    }));
    setCuponApplied(false);
  }, [cart]);
  useEffect(() => {
    if (user?.fullName) {
      setCheckOutForm((prev) => ({
        ...prev,
        buyerName: user?.fullName,
      }));
    }
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCheckOutForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const checkOutData = { ...checkOutForm };

    const toastId = toast.loading('Ordering');
    e.preventDefault();
    const res = await submitOrder(checkOutData);

    if (res?.data?.success) {
      toast.success('Order Completed Successfully', {
        id: toastId,
        duration: 2000,
      });
      setCheckOutForm((prev) => ({
        ...prev,
        buyerName: '',
        shippingAddress: '',
        quantity: 0,
        shippingCost: 0,
        items: [],
        purchaseDate: new Date(),
      }));
      dispatch(checkOut());
      navigae('/buyer/inventory');
    } else
      toast.error('Could Order', {
        id: toastId,
        duration: 2000,
      });
  };
  const handleCupon = async () => {
    const cuponObject = { ...allcost };
    const cuponCode = data.data;
    if (cuponCode && cuponCode.code === code && cuponApplied === false) {
      if (cuponCode.type === 'percent') {
        const percentage = cuponCode.amount / 100;
        const parcentageAmount = percentage * cuponObject.itemCost;
        const discountedTotal = cuponObject.total - parcentageAmount;
        setDiscountMessage(
          `${cuponCode.amount} % / ${parcentageAmount} BDT is deducted from total amount`
        );
        setAllCost((prev) => ({
          ...prev,
          total: discountedTotal,
        }));
        setCode('');
        setCuponApplied(true);
      } else if (cuponCode.type === 'flat') {
        const discountAmount = cuponCode.amount;
        if (discountAmount > cuponObject.total) {
          toast.error('The Amount Should be less then item cost');
          return;
        }
        const discountedTotal = cuponObject.total - discountAmount;
        setAllCost((prev) => ({
          ...prev,
          total: discountedTotal,
        }));
        setCode('');
        setCuponApplied(true);
        setDiscountMessage(
          ` ${discountAmount} BDT is deducted from total amount`
        );
      }
    } else {
      toast.error('Cupon Code Not found');
    }
  };

  return (
    <>
      {cart.totalItem ? (
        <>
          <Row gutter={[16, 0]} className="gutter-row" justify="space-around">
            <Col span={24}>
              <Row>
                <Col span={6} style={{ fontWeight: 'bold', padding: '5px 0' }}>
                  Item
                </Col>
                <Col span={6} style={{ fontWeight: 'bold', padding: '5px 0' }}>
                  Unit Price
                </Col>
                <Col span={5} style={{ fontWeight: 'bold', padding: '5px 0' }}>
                  Quantity
                </Col>
                <Col span={5} style={{ fontWeight: 'bold', padding: '5px 0' }}>
                  Total
                </Col>
              </Row>
            </Col>
            {cart &&
              cart?.items.length > 0 &&
              cart.items.map((product: TItems, i: number) => (
                <Col
                  key={i}
                  span={24}
                  style={{ ...style }}
                  className="gutter-row"
                >
                  <Row>
                    <Col span={6}>
                      <div
                        style={{
                          display: 'flex',
                          gap: 10,
                          alignItems: 'center',
                        }}
                      >
                        <img
                          src={product.image}
                          width={50}
                          height={50}
                          style={{ objectFit: 'cover' }}
                        />
                        <p>{product.name}</p>
                      </div>
                    </Col>
                    <Col
                      span={6}
                      style={{
                        alignItems: 'center',
                        display: 'flex',
                      }}
                    >
                      {product.unitPrice}
                    </Col>
                    <Col
                      span={5}
                      style={{
                        alignItems: 'center',
                        display: 'flex',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <PlusSquareOutlined
                          onClick={() =>
                            handleQuantity(product._id, 'increase')
                          }
                          style={{ fontSize: '1.4em', cursor: 'pointer' }}
                        />
                        <input
                          type="number"
                          min={1}
                          readOnly={true}
                          max={product.availableItem}
                          value={product.quantity}
                        />
                        <MinusSquareOutlined
                          disabled={true}
                          onClick={() =>
                            handleQuantity(product._id, 'decrease')
                          }
                          style={{ fontSize: '1.4em', cursor: 'pointer' }}
                        />
                      </div>
                    </Col>
                    <Col
                      span={5}
                      style={{
                        alignItems: 'center',
                        display: 'flex',
                      }}
                    >
                      {product.unitPrice * product.quantity}
                    </Col>
                    <Col
                      span={2}
                      style={{
                        alignItems: 'center',
                        display: 'flex',
                      }}
                    >
                      <DeleteOutlined
                        style={{ cursor: 'pointer', color: 'red' }}
                        onClick={() => handleRemove(product._id)}
                      />
                    </Col>
                  </Row>
                </Col>
              ))}
          </Row>
          <div style={{ display: 'flex', justifyContent: 'right' }}>
            <div>
              <div style={{ textAlign: 'right', marginTop: 10 }}>
                <p>Item Cost: {allcost.itemCost} BDT.</p>
                <p style={{ marginTop: 10 }}>
                  {' '}
                  Shipping Cost: {allcost.shipping} BDT.
                </p>
                <div style={{ margin: '20px 0 0' }}>
                  <Space.Compact style={{ width: '200px' }}>
                    <Input
                      disabled={cuponApplied}
                      value={code}
                      placeholder="Cupon Code"
                      name="cupon"
                      size="small"
                      onChange={(e) => setCode(e.target.value)}
                    />
                    <Button
                      type="default"
                      onClick={handleCupon}
                      size="small"
                      disabled={cuponApplied}
                    >
                      Apply
                    </Button>
                  </Space.Compact>
                  <p
                    style={{
                      fontSize: '12px',
                      fontWeight: 'bold',
                      margin: '8px 0',
                      color: 'orange',
                    }}
                  >
                    {cuponApplied ? discountMessage : ''}
                  </p>
                </div>
                ___________________________________________________________
                <p style={{ fontWeight: 'bold' }}>
                  Total Cost: {allcost.total.toFixed(2)} BDT.
                </p>
              </div>
              <div>
                <p style={{ fontWeight: 'bold', marginBottom: '1em' }}>
                  Plese fill up all the required field to checkout
                </p>
                <form onSubmit={handleSubmit}>
                  <label>Buyer Name</label>
                  <Input
                    style={{ margin: '5px 0 10px' }}
                    placeholder="Buyer Name"
                    value={checkOutForm.buyerName}
                    onChange={handleChange}
                    name="buyerName"
                    required
                  />
                  <label>Shipping Address</label>
                  <Input
                    style={{ margin: '5px 0 10px' }}
                    placeholder="Shipping Address"
                    onChange={handleChange}
                    value={checkOutForm.shippingAddress}
                    name="shippingAddress"
                    required
                  />
                  <label>Quantity</label>
                  <Input
                    style={{ margin: '5px 0 10px' }}
                    placeholder="Quantity"
                    disabled={true}
                    value={checkOutForm.quantity}
                    name="quantity"
                    required
                  />
                  <Button
                    htmlType="submit"
                    style={{ marginTop: '10px' }}
                    disabled={
                      checkOutForm.buyerName && checkOutForm.shippingAddress
                        ? false
                        : true
                    }
                  >
                    Checkout
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '70vh',
          }}
        >
          <h3 style={{ color: 'red', fontWeight: 'orange' }}>Cart is Empty </h3>
        </div>
      )}
    </>
  );
};

export default Checkout;
