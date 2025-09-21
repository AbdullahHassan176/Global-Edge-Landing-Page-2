import { library, config } from '@fortawesome/fontawesome-svg-core';
import { 
  faCube,
  faBars,
  faChevronRight,
  faChevronLeft,
  faSearch,
  faFilter,
  faHeart,
  faShare,
  faBell,
  faUser,
  faShieldHalved,
  faShield,
  faShip,
  faBuilding,
  faBoxesStacked,
  faVault,
  faMapMarkerAlt,
  faLocationDot,
  faCalendar,
  faClock,
  faCheck,
  faCheckCircle,
  faCheckDouble,
  faTimes,
  faPlus,
  faArrowRight,
  faPaperPlane,
  faCalculator,
  faTruck,
  faSatelliteDish,
  faCertificate,
  faLeaf,
  faGavel,
  faFileContract,
  faHandshake,
  faUsers,
  faBalanceScale,
  faFileCode,
  faBug,
  faRocket,
  faCog,
  faClipboardList,
  faUsersCog,
  faStore,
  faChartBar,
  faEye,
  faLink,
  faFileAlt,
  faChartLine,
  faUserCheck,
  faCoins,
  faTrophy,
  faLock,
  faThLarge,
  faList,
  faExclamationTriangle,
  faLayerGroup,
  faDatabase,
  faThermometerHalf,
  faDollarSign,
  faCloudUploadAlt,
  faDoorOpen,
  faGlobe,
  faTachometerAlt
} from '@fortawesome/free-solid-svg-icons';
import { 
  faHeart as faHeartRegular,
  faUser as faUserRegular,
  faBell as faBellRegular
} from '@fortawesome/free-regular-svg-icons';
import { 
  faTwitter,
  faLinkedin,
  faGithub,
  faFacebook,
  faInstagram
} from '@fortawesome/free-brands-svg-icons';

// Add all icons to the library
library.add(
  // Solid icons
  faCube, faBars, faChevronRight, faChevronLeft, faSearch, faFilter,
  faHeart, faShare, faBell, faUser, faShieldHalved, faShield,
  faShip, faBuilding, faBoxesStacked, faVault, faMapMarkerAlt, faLocationDot,
  faCalendar, faClock, faCheck, faCheckCircle, faCheckDouble, faTimes, faPlus,
  faArrowRight, faPaperPlane, faCalculator, faTruck, faSatelliteDish,
  faCertificate, faLeaf, faGavel, faFileContract, faHandshake, faUsers,
  faBalanceScale, faFileCode, faBug, faRocket, faCog, faClipboardList,
  faUsersCog, faStore, faChartBar, faEye, faLink, faFileAlt, faChartLine,
  faUserCheck, faCoins, faTrophy, faLock, faThLarge, faList,
  faExclamationTriangle, faLayerGroup, faDatabase, faThermometerHalf,
  faDollarSign, faCloudUploadAlt, faDoorOpen, faGlobe, faTachometerAlt,
  
  // Regular icons
  faHeartRegular, faUserRegular, faBellRegular,
  
  // Brand icons
  faTwitter, faLinkedin, faGithub, faFacebook, faInstagram
);

// Configure Font Awesome
config.autoAddCss = false;
config.autoReplaceSvg = 'nest';
