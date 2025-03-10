import CustomButton from './CustomButton';
import CustomIcon from './CustomIcon';

const CustomButtonIcon = ({
                              type = 'primary',
                              onBackground = false,
                              withBackground = false,
                              withBorder = false,
                              icon,
                              onPress = () => {
                              },
                              style,
                              disabled = false,
                          }) => {
    return (
        <CustomButton
            type={type}
            onBackground={onBackground}
            withBackground={withBackground}
            withBorder={withBorder}
            onPress={onPress}
            style={style}
            disabled={disabled}
        >
            <CustomIcon icon={icon} onBackground={onBackground}/>
        </CustomButton>
    );
};

export default CustomButtonIcon;
