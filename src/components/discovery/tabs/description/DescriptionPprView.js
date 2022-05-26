const DescriptionPprView = () => {
    const data = {  description: "String",  certificates: ["String", "String"], location: "String", location_flag: "URL to flag image", member_since: "date/String", last_updated: "date/String"  }



    const showCertificates = (certificates) => {
        if (certificates === undefined || certificates === []) return;
        return (
            certificates.map(cert => {return (<S.Tag>{cert}</S.Tag>)})
        );

    }

    return (
        <>
        <S.ExpandedContainer>
          <S.VerticalContainer horizontal='8px'>
            <S.Padding horizontal='8px'>
              <S.Title>Description</S.Title>
              <S.Body>{data.description}</S.Body>
  
              <S.Padding vertical='8px' horizontal='0px'>
                <S.Subtitle>Certificates</S.Subtitle>
              </S.Padding>
  
              <S.HorizontalContainer>
                  {showCertificates(data.certificates)}
              </S.HorizontalContainer>
  
              <S.HorizontalContainer>
                <ColumnItem title='MEMBER SINCE' subtitle={data.member_since} />
                <ColumnItem title='LAST UPDATE' subtitle={data.last_updated} />
                <ColumnItem title='LOCATION' subtitle={data.location} />
              </S.HorizontalContainer>
            </S.Padding>
          </S.VerticalContainer>
  
        </S.ExpandedContainer>
      </>
  
    );

}

export default DescriptionPprView;
