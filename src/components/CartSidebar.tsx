import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useState } from "react";

interface CartItem {
  id: number;
  name: string;
  type: string;
  price: number;
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  setItems: (items: CartItem[]) => void;
}

const CartSidebar = ({
  isOpen,
  onClose,
  items,
  setItems,
}: CartSidebarProps) => {
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const removeFromCart = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode === "WELCOME10") {
      setDiscount(10);
    } else if (promoCode === "SAVE20") {
      setDiscount(20);
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const deliveryFee = subtotal > 1000 ? 0 : 199;
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal + deliveryFee - discountAmount;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <Icon name="ShoppingCart" size={20} className="mr-2" />
            Корзина ({items.length})
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <Icon
                name="ShoppingCart"
                size={48}
                className="mx-auto text-gray-400 mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                Корзина пуста
              </h3>
              <p className="text-gray-500">Добавьте блюда из ресторанов</p>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {items.map((item) => (
                  <Card key={item.id} className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-600">{item.price} ₽</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Promo Code */}
              <Card className="p-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Промокод"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-md text-sm"
                  />
                  <Button size="sm" onClick={applyPromoCode}>
                    Применить
                  </Button>
                </div>
                {discount > 0 && (
                  <div className="mt-2 text-sm text-green-600">
                    <Icon name="Check" size={14} className="inline mr-1" />
                    Скидка {discount}% применена
                  </div>
                )}
              </Card>

              {/* Order Summary */}
              <Card className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Сумма заказа</span>
                    <span>{subtotal} ₽</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Доставка</span>
                    <span className={deliveryFee === 0 ? "text-green-600" : ""}>
                      {deliveryFee === 0 ? "Бесплатно" : `${deliveryFee} ₽`}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Скидка ({discount}%)</span>
                      <span>-{discountAmount} ₽</span>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                    <span>Итого</span>
                    <span>{total} ₽</span>
                  </div>
                </div>
              </Card>

              {/* Delivery Info */}
              <Card className="p-4 bg-blue-50">
                <div className="flex items-center space-x-3">
                  <Icon name="MapPin" size={20} className="text-blue-600" />
                  <div>
                    <p className="font-medium">Доставка по адресу</p>
                    <p className="text-sm text-gray-600">Москва, Тверская 1</p>
                    <p className="text-sm text-gray-600">Время: 25-35 мин</p>
                  </div>
                </div>
              </Card>

              {/* Checkout Button */}
              <Button
                className="w-full h-12 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
                size="lg"
              >
                Оформить заказ на {total} ₽
              </Button>

              {/* Payment Methods */}
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Способы оплаты</p>
                <div className="flex justify-center space-x-2">
                  <Badge variant="outline">💳 Карта</Badge>
                  <Badge variant="outline">💰 Наличные</Badge>
                  <Badge variant="outline">📱 SberPay</Badge>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;
