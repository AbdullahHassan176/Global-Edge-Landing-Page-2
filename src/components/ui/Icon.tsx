import React from 'react';
import { 
  ArrowRightIcon, BellIcon, UserIcon, Bars3Icon, CheckIcon as UserCheckIcon, MagnifyingGlassIcon, ChartBarIcon, 
  CurrencyDollarIcon, TrophyIcon, TruckIcon, BuildingOfficeIcon, CubeIcon, ShieldCheckIcon, LockClosedIcon, AcademicCapIcon,
  PaperAirplaneIcon, PlusIcon, ArrowDownTrayIcon, ChartBarSquareIcon, Cog6ToothIcon,
  CheckCircleIcon, ClockIcon, DocumentTextIcon, ScaleIcon, HandRaisedIcon, UsersIcon, ScaleIcon as ScaleIcon2,
  CircleStackIcon, CurrencyDollarIcon as DollarIcon, CloudArrowUpIcon, GlobeAltIcon,
  EyeIcon, LinkIcon, DocumentIcon, HeartIcon, BugAntIcon, RocketLaunchIcon, ClipboardDocumentListIcon, BuildingStorefrontIcon, ListBulletIcon,
  ExclamationTriangleIcon, Squares2X2Icon, CheckIcon, XMarkIcon, CalendarIcon, TruckIcon as TruckIcon2,
  DocumentCheckIcon, CodeBracketIcon, RocketLaunchIcon as RocketIcon, ClipboardDocumentListIcon as ClipboardListIcon, UserGroupIcon,
  MapPinIcon, ArrowPathIcon, ArrowDownIcon, ArrowUpIcon, ArrowLeftIcon, CreditCardIcon, EnvelopeIcon, ChatBubbleLeftRightIcon, ServerIcon, RssIcon, UserPlusIcon
} from '@heroicons/react/24/outline';

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  'arrow-right': ArrowRightIcon,
  'bell': BellIcon,
  'user': UserIcon,
  'bars': Bars3Icon,
  'user-check': UserCheckIcon,
  'search': MagnifyingGlassIcon,
  'chart-line': ChartBarIcon,
  'coins': CurrencyDollarIcon,
  'trophy': TrophyIcon,
  'ship': TruckIcon,
  'building': BuildingOfficeIcon,
  'boxes-stacked': CubeIcon,
  'vault': ShieldCheckIcon,
  'shield-halved': ShieldCheckIcon,
  'lock': LockClosedIcon,
  'certificate': AcademicCapIcon,
  'paper-plane': PaperAirplaneIcon,
  'twitter': PaperAirplaneIcon, // Placeholder
  'linkedin': PaperAirplaneIcon, // Placeholder
  'github': PaperAirplaneIcon, // Placeholder
  'plus': PlusIcon,
  'download': ArrowDownTrayIcon,
  'chart-bar': ChartBarSquareIcon,
  'cog': Cog6ToothIcon,
  'percent': CheckIcon,
  'check-circle': CheckCircleIcon,
  'clock': ClockIcon,
  'file-alt': DocumentTextIcon,
  'gavel': ScaleIcon,
  'handshake': HandRaisedIcon,
  'users': UsersIcon,
  'balance-scale': ScaleIcon2,
  'database': CircleStackIcon,
  'thermometer': CheckIcon,
  'dollar-sign': DollarIcon,
  'cloud-upload': CloudArrowUpIcon,
  'door-open': CheckIcon,
  'globe': GlobeAltIcon,
  'gauge': CheckIcon,
  'eye': EyeIcon,
  'link': LinkIcon,
  'file': DocumentIcon,
  'heart': HeartIcon,
  'bug': BugAntIcon,
  'rocket': RocketIcon,
  'clipboard': ClipboardDocumentListIcon,
  'store': BuildingStorefrontIcon,
  'list': ListBulletIcon,
  'exclamation-triangle': ExclamationTriangleIcon,
  'layer-group': Squares2X2Icon,
  'check': CheckIcon,
  'times': XMarkIcon,
  'calendar': CalendarIcon,
  'truck': TruckIcon2,
  'satellite': CheckIcon,
  'leaf': CheckIcon,
  'file-contract': DocumentCheckIcon,
  'file-code': CodeBracketIcon,
  'clipboard-list': ClipboardListIcon,
  'users-cog': UserGroupIcon,
  'shield': ShieldCheckIcon,
  'circle-check': CheckCircleIcon,
  'handshake-alt': HandRaisedIcon,
  'satellite-dish': CheckIcon,
  'chart-line-up': ChartBarIcon,
  'location-dot': MapPinIcon,
  'cloud-arrow-up': CloudArrowUpIcon,
  'users-gear': UserGroupIcon,
  'chart-column': ChartBarSquareIcon,
  'check-double': CheckCircleIcon,
  'chevron-right': ArrowRightIcon,
  'boxes': CubeIcon,
  'filter': CheckIcon,
  'grid': Squares2X2Icon,
  'arrow-right-arrow-left': ArrowPathIcon,
  'arrow-down': ArrowDownIcon,
  'id-card': UserIcon, // ID card icon
  'home': BuildingOfficeIcon, // Home icon
  'university': BuildingOfficeIcon, // University icon
  'code': CodeBracketIcon, // Code icon
  'shield-check': ShieldCheckIcon, // Shield check icon
  'credit-card': CreditCardIcon, // Credit card icon
  'cube': CubeIcon, // Cube icon
  'envelope': EnvelopeIcon, // Envelope icon
  'chat-alt-2': ChatBubbleLeftRightIcon, // Chat icon
  'server': ServerIcon, // Server icon
  'rss': RssIcon, // RSS icon
  'user-plus': UserPlusIcon, // User plus icon
  'rocket-launch': RocketLaunchIcon, // Rocket launch icon
};

export default function Icon({ name, className = '', size = 16 }: IconProps) {
  const IconComponent = iconMap[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return <div className={className} style={{ width: size, height: size }} />;
  }
  
  // Drastically reduce size for specific problematic icons
  const problematicIcons = ['arrow-right', 'check-circle', 'chevron-right', 'search', 'chart-line-up', 'users'];
  let sizeClass = '';
  
  if (problematicIcons.includes(name)) {
    sizeClass = 'force-icon-small';
    // console.log(`Icon ${name} forced to 20px with CSS class force-icon-small`);
  } else {
    // Ensure size is reasonable
    sizeClass = 'force-icon-medium';
  }
  
  // Remove any large text size classes and width/height classes that might make icons huge
  const cleanClassName = className
    .replace(/text-[3-9]xl/g, '')
    .replace(/text-2xl/g, '')
    .replace(/text-xl/g, '')
    .replace(/text-lg/g, '')
    .replace(/text-sm/g, '')
    .replace(/text-base/g, '')
    .replace(/w-[2-9][0-9]/g, '')
    .replace(/h-[2-9][0-9]/g, '')
    .replace(/w-[1-9][0-9]/g, '')
    .replace(/h-[1-9][0-9]/g, '')
    .replace(/w-[1-9]/g, '')
    .replace(/h-[1-9]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  
  // Combine the cleaned className with the size class
  const finalClassName = `${sizeClass} ${cleanClassName}`.trim();
  
  // Debug logging (disabled for performance)
  // if (problematicIcons.includes(name)) {
  //   console.log(`Icon ${name} final className: "${finalClassName}"`);
  // }
  
  return <IconComponent className={finalClassName} size="sm" />;
}