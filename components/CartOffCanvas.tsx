import { useRouter } from "next/router";
import { FC } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import CartItems from "./CartItems";
import { useAppSelector } from "@/helper/hooks";
import { Orders } from "@/services/order.service";
interface IProps {
  show: boolean;
  setShow: (show: boolean) => void;
}
const CartOffCanvas: FC<IProps> = ({ show, setShow }: IProps) => {
  const handleClose = () => setShow(false);
  const router = useRouter();
  const cart = useAppSelector((state) => state.cart);

  const handleCheckout = async () => {
    try {
      if (cart.data.length > 0) {
        const sessionRes = await Orders.checkoutSession(cart.data);
        if (!sessionRes.success) {
          throw new Error(sessionRes.message);
        }
        router.push(sessionRes.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Shoping Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <CartItems />
          <Button
            variant="primary"
            style={{ width: "100%" }}
            onClick={
              () => handleCheckout()
              // 	{
              // 	setShow(false);
              // 	router.push('/checkout');
              // }
            }
          >
            Checkout
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default CartOffCanvas;
