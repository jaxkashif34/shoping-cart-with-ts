import storeItems from '../data/items.json';
import { Offcanvas, Stack } from 'react-bootstrap';
import { useShopingCart } from '../context/shopingCartContext';
import { CartItem } from './CartItem';
import { formatCurrency } from '../utilities/formatCurrency';

export function ShopingCart() {
  const { isOpen, closeCart, cartItems } = useShopingCart();
  return (
    <Offcanvas show={isOpen} placement="end" onHide={closeCart}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total{' '}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                // we don't have a quantity field in the cartItem, so we need to find the item in the storeItems array
                const item = storeItems.find((item) => item.id === cartItem.id);
                return total + (item?.price ?? 0) * cartItem.quantity;
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
