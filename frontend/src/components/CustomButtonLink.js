import React from 'react';

import CustomButton from './CustomButton';
import CustomText from './CustomText';

const CustomButtonLink = ({ 
  text = 'Texte avant le lien',
  linkText = 'Cliquez ici',
  type = 'primary',
  onBackground = true, 
  withBackground = false, 
  withBorder = false, 
  onPress = () => {}, 
  textStyle, 
  linkStyle, 
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
      <CustomText level='p' style={textStyle}>
        {text}{' '}
      </CustomText>
      <CustomText level='p' style={linkStyle}>
        {linkText}
      </CustomText>
    </CustomButton>
  );
};

export default CustomButtonLink;