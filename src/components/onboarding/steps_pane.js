const stepsPane = ({type, currentStage}) => {
    return (
        <>
            {buildStepCardView({ stage: '1', title: 'Customer or provider', subtitle: 'Step 1', })}
            {buildStepCardView({ stage: '2', title: 'Organization details', subtitle: 'Step 2' })}
            {buildStepCardView({ stage: '3', title: 'Confirmation email', subtitle: 'Step 3', isActive: true })}
            {buildStepCardView({ stage: '4', title: 'Email notification', subtitle: 'Step 4' })}
            <Row>
                <Padding vertical='32px'><MasterButton disabled>Previous</MasterButton></Padding>
                <Padding vertical='32px'><MasterButton>Next</MasterButton></Padding>
            </Row>
        </>
    )
}

export default stepsPane;