const FinishCustomer = () => {
    return <>
    <Style width='633px' height='246px'>
        <Padding horizontal='20px'>
            <Card background='#fff' borderColor='#0' boxShadow={`0px 2px 4px 0px rgb(29 36 48 / 12%)`}>
                <Padding horizontal='24px'>
                    <H4LightText>Registration status</H4LightText>
                    <HorizontalLine />
                    <Padding vertical='12px'>
                       <BodyText>You have already triggered the compliance check. Your registration is still in process.</BodyText>
                    </Padding>
                    <Padding vertical='28px'>
                        <BlueButton onClick={e=>navigate('/')} marginLeft="0">{t('onboarding.home_button')}</BlueButton>
                    </Padding>
                </Padding>
            </Card>
        </Padding>
    </Style>
</>
}

export default FinishCustomer;