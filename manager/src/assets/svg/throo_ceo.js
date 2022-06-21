import React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';

export const ComponentThrooCEO = ({iHeight,iWidth,iColor}) => {
  let sWidth = 40;
  let sHeight = 40;
  let sColor = "#000";

  if(iHeight !== undefined && iHeight !== null){
    sHeight = iHeight;
  }

  if(iWidth !== undefined && iWidth !== null){
    sWidth = iWidth;
  }

  if(iColor !== undefined && iColor !== null){
    sColor = iColor;
  }

  return (
    <Svg width={sWidth} height={sHeight} viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Rect width={sWidth} height={sHeight} fill="white"/>
      <Rect y="690" width={sWidth} height="334" fill="#40C1BB"/>
      <Path d="M259.825 790.74V781.002H242.525V790.74C242.421 811.147 222.376 831.658 195.08 836.631L202.228 850.201C224.345 845.488 242.525 832.021 251.227 814.358C259.825 832.176 278.005 845.591 300.225 850.201L307.528 836.631C279.818 831.762 259.773 811.251 259.825 790.74ZM191.403 888.167H312.449V874.7H191.403V888.167ZM427.792 777.221H335.078V790.273H411.114V802.497H335.389V841.085H430.796V827.981H351.86V814.876H427.792V777.221ZM320.886 865.325H372.992V905.26H389.36V865.325H441.932V852.325H320.886V865.325ZM497.969 804.465V783.281H481.706V804.465C481.602 828.861 469.482 854.189 448.142 864.238L458.19 877.394C473.315 869.78 484.14 854.811 489.993 836.838C495.639 853.671 505.894 867.656 520.293 874.907L530.186 861.855C509.727 851.962 497.866 828.032 497.969 804.465ZM538.059 904.949H554.375V838.392H574.782V824.562H554.375V772.663H538.059V904.949ZM627.815 796.541V794.987H655.267V781.831H583.375V794.987H611.448V796.644C611.344 814.255 600.156 831.451 578.817 838.34L587.104 851.237C603.005 845.902 614.141 834.921 619.994 821.04C625.847 832.953 636.361 842.38 651.227 847.041L658.944 834.248C638.278 827.929 627.815 812.701 627.815 796.541ZM596.893 879.569C596.841 895.522 613.986 904.897 641.696 904.845C669.148 904.897 685.982 895.522 685.982 879.569C685.982 863.72 669.148 854.5 641.696 854.5C613.986 854.5 596.841 863.72 596.893 879.569ZM613.157 879.569C613.105 871.541 623.516 867.294 641.696 867.294C659.825 867.294 669.977 871.541 669.977 879.569C669.977 887.753 659.825 892.104 641.696 892.052C623.516 892.104 613.105 887.753 613.157 879.569ZM668.423 851.599H684.79V817.777H703.281V804.414H684.79V772.663H668.423V851.599ZM819.971 772.663H803.863V847.145H819.971V772.663ZM717.778 839.531H729.018C752.43 839.427 772.319 837.874 793.504 833.471L791.432 820.16C772.682 824.2 754.864 825.65 734.146 825.857V780.329H717.778V839.531ZM732.488 903.24H819.971V852.843H732.488V903.24ZM748.545 890.394V865.688H804.07V890.394H748.545Z" fill="white"/>
      <Path d="M622.808 429.681C614.596 429.697 606.521 427.569 599.383 423.508L384.164 300.634C378.507 297.704 373.5 293.661 369.444 288.747C365.389 283.833 362.369 278.15 360.565 272.039C358.761 265.929 358.212 259.516 358.949 253.188C359.686 246.859 361.695 240.745 364.855 235.212C368.014 229.68 372.26 224.843 377.336 220.993C382.412 217.143 388.215 214.359 394.394 212.807C400.574 211.256 407.003 210.97 413.296 211.967C419.589 212.963 425.616 215.221 431.014 218.605L646.233 341.395C655.267 346.572 662.338 354.587 666.35 364.195C670.362 373.804 671.089 384.468 668.419 394.532C665.749 404.596 659.83 413.497 651.583 419.853C643.335 426.208 633.22 429.663 622.808 429.681Z" fill="#001E62"/>
      <Path d="M407.589 552.554C397.177 552.537 387.062 549.082 378.814 542.726C370.567 536.37 364.648 527.469 361.978 517.405C359.308 507.341 360.035 496.677 364.047 487.069C368.059 477.46 375.13 469.445 384.164 464.268L461.796 419.956C467.194 416.571 473.22 414.313 479.513 413.317C485.806 412.32 492.235 412.606 498.415 414.158C504.594 415.709 510.397 418.493 515.473 422.343C520.549 426.194 524.795 431.03 527.955 436.563C531.115 442.095 533.123 448.21 533.861 454.538C534.598 460.867 534.048 467.279 532.244 473.389C530.44 479.5 527.42 485.183 523.365 490.097C519.309 495.011 514.302 499.054 508.645 501.984L430.929 546.296C423.823 550.369 415.78 552.526 407.589 552.554Z" fill="#001E62"/>
    </Svg>
  );
};
