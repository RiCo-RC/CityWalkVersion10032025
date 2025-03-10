import React from 'react';

import CustomButton from './CustomButton';
import CustomText from './CustomText';

const CustomButtonText = ({ 
  type = 'primary', 
  onBackground = true, 
  withBackground = true, 
  withBorder = true,
  children, 
  onPress = () => {}, 
  textStyle,
  buttonStyle,
  disabled = false,
}) => {
  return (
    <CustomButton 
      type={type} 
      onBackground={onBackground} 
      withBackground={withBackground}
      withBorder={withBorder}
      onPress={onPress} 
      style={buttonStyle}
      disabled={disabled}
    >
      {/* <CustomText level='p' style={textStyle}>{children}</CustomText> */}
      {children}
    </CustomButton>
  );
};

export default CustomButtonText;