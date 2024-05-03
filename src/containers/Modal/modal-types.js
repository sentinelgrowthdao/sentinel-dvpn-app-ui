import DNSModal from "./DNSModal";
import FeeGranterModal from "./FeeGranterModal";
import FiltersModal from "./FiltersModal";
import LogoutModal from "./LogoutModal";
import NoBalanceModal from "./NoBalanceModal";
import RenewSubscriptionModal from "./RenewSubscriptionModal";

const types = {
  "no-balance": NoBalanceModal,
  "renew-subscription": RenewSubscriptionModal,
  filters: FiltersModal,
  dns: DNSModal,
  logout: LogoutModal,
  "fee-granter": FeeGranterModal,
};

export const MODAL_VARIANTS = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
};

export default types;
