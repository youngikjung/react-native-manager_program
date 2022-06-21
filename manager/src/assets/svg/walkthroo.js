import React from 'react';
import Svg, {G, Path, ClipPath, Rect} from 'react-native-svg';

export const ComponentWalkThroo = ({iHeight,iWidth,iColor}) => {
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
    <Svg width={sWidth} height={sHeight} viewBox="0 0 46 56" fill={sColor} xmlns="http://www.w3.org/2000/svg">
    <G clip-path="url(#clip0_1823_12991)">
    <Path d="M38.213 36.182C42.5863 36.8753 46.5063 32.502 45.013 28.262C44.3463 26.1553 42.5597 24.4753 40.213 24.0753L36.0263 23.462C34.3997 22.4753 30.2663 19.9686 28.693 19.0086C36.4263 13.8886 33.3597 1.16865 24.1597 0.128646C14.9863 -1.33802 8.63966 10.0753 14.693 17.0886C13.1463 18.582 2.58633 28.742 2.58633 28.742C1.38633 29.8886 0.692992 31.462 0.666325 33.1153C0.532992 38.982 7.94633 41.6486 11.733 37.1953V38.502L8.71966 44.102L7.43966 45.4086C4.93299 47.8886 5.41299 51.9153 8.05299 54.102C14.3997 59.9153 20.0797 49.8353 24.8797 46.4486C26.0263 48.102 28.533 51.782 29.653 53.4886C31.7863 56.6353 35.893 56.662 38.693 54.3686C41.3863 52.742 42.213 48.902 40.4263 46.3153C38.0263 42.662 35.653 39.2753 33.2263 35.542L33.173 35.462V35.4086L34.3997 35.5953L38.2397 36.182H38.213ZM18.0263 5.86198C23.5997 0.315313 32.5863 7.62198 28.213 14.182C22.5863 22.0486 11.5197 12.8753 18.0263 5.86198ZM21.7063 44.2086C19.1197 46.742 16.613 48.9553 14.0263 51.3553C11.5997 53.5686 8.13299 49.9686 10.533 47.622L11.8663 46.342L15.2263 40.182L21.813 44.1286L21.7063 44.2353V44.2086ZM36.933 48.2086C38.613 50.9553 34.693 53.382 32.9597 50.8753C31.6263 48.9286 28.9863 44.902 27.6797 42.9286L16.1863 36.102V34.9286L15.4663 28.022L8.39966 34.822C6.74633 36.502 3.91966 34.502 4.87966 32.3686C4.98633 32.102 5.14633 31.8886 5.35966 31.6753L16.7997 20.662H22.133C25.013 20.662 27.573 22.9286 27.8397 25.702C27.9997 27.0086 29.013 35.5953 29.1197 36.3953C31.0397 39.302 34.7197 44.822 36.933 48.182V48.2086ZM34.3197 32.102L32.6663 31.862L31.7063 24.9286C32.533 25.4353 33.9463 26.2886 34.7997 26.822L39.5997 27.5153C43.0397 28.1286 42.0797 33.1953 38.7197 32.7953C37.6263 32.6353 35.893 32.3686 34.293 32.1286L34.3197 32.102Z" fill={sColor}/>
    </G>
    <ClipPath id="clip0_1823_12991">
    <Rect width="44.6667" height="56" fill={sColor} transform="translate(0.666504)"/>
    </ClipPath>
    </Svg>

  );
};
