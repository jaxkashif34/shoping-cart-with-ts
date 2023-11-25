import { Button, Stack } from 'react-bootstrap';
import { useShopingCart } from '../context/shopingCartContext';
import storeItems from '../data/items.json';
import { formatCurrency } from '../utilities/formatCurrency';

interface ICartItemProps {
  id: number;
  quantity: number;
}

export function CartItem({ id, quantity }: ICartItemProps) {
  const { removeItem } = useShopingCart();
  const item = storeItems.find((item) => item.id === id);
  if (item == null) return null;
  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img src={item.imgUrl} alt="cart image" style={{ width: '125px', height: '75px', objectFit: 'cover' }} />
      <div className="me-auto">
        <div>
          {item.name}{' '}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: '.65rem' }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: '.75rem' }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div>{formatCurrency(item.price * quantity)}</div>
      <Button variant="outline-danger" size="sm" onClick={() => removeItem(item.id)}>
        &times;
      </Button>
    </Stack>
  );
}
