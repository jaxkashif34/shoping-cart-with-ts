import { Button, Card } from 'react-bootstrap';
import { formatCurrency } from '../utilities/formatCurrency';
import { useShopingCart } from '../context/shopingCartContext';

interface IStoreItemProps {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
}

export function StoreItem({ id, name, price, imgUrl }: IStoreItemProps) {
  const { decreaseItemQuantity, getItemQuantity, increaseItemQuantity, removeItem } = useShopingCart();
  const quantity = getItemQuantity(id);
  return (
    <Card>
      <Card.Img variant="top" src={imgUrl} height="200px" style={{ objectFit: 'cover' }} />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {/* need to verify that if that's actually works mt-auto*/}
          {getItemQuantity(id) === 0 ? (
            <Button className="w-100" onClick={() => increaseItemQuantity(id)}>
              + Add To Cart
            </Button>
          ) : (
            <div className="d-flex align-item-center flex-column" style={{ gap: '.5rem' }}>
              <div className="d-flex justify-content-center align-items-center" style={{ gap: '.5rem' }}>
                <Button onClick={() => decreaseItemQuantity(id)}>-</Button>
                <div>
                  <span className="fs-3">{quantity}</span> in cart
                </div>
                <Button onClick={() => increaseItemQuantity(id)}>+</Button>
              </div>
              <Button variant="danger" size="sm" style={{ alignSelf: 'center' }} onClick={() => removeItem(id)}>
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
