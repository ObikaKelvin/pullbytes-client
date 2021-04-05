import { combineReducers } from 'redux';
import Auth from './Auth';
import Theme from './Theme';
import PlanReducer from './PlanReducer';
import UserReducer from './UserReducer';
import LicenseReducer from './LicenseReducer';
import SalesReducer from './SalesReducer';
import SubscriptionReducer from './SubscriptionReducer';
import PaymentReducer from './PaymentReducer';
import TicketReducer from './TicketReducer';
import NotificationReducer from './NotificationReducer';
import CouponReducer from './CouponReducer';
import PromoCodeReducer from './PromoCodeReducer';

const reducers = combineReducers({
    theme: Theme,
    auth: Auth,
    planReducer: PlanReducer,
    userReducer: UserReducer,
    licenseReducer: LicenseReducer,
    salesReducer: SalesReducer,
    subscriptionReducer: SubscriptionReducer,
    PaymentReducer: PaymentReducer,
    notificationReducer: NotificationReducer,
    ticketReducer: TicketReducer,
    couponReducer: CouponReducer,
    promoCodeReducer: PromoCodeReducer
});

export default reducers;