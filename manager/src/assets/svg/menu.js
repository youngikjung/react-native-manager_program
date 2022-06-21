import React from 'react';
import Svg, {Circle,Polyline,Line,Path} from 'react-native-svg';

export const ComponentMenu = ({iHeight,iWidth,iColor}) => {
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
    <Svg width={sWidth} height={sHeight} viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path d="M34 0H6C2.68629 0 0 2.68629 0 6V54C0 57.3137 2.68629 60 6 60H34C37.3137 60 40 57.3137 40 54V6C40 2.68629 37.3137 0 34 0Z" fill="#353D4E"/>
    </Svg>
  );
};
