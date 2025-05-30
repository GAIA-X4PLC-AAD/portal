/* test coverage not required */
import { Menu, MenuItem } from '@szhsin/react-menu';
import axios from 'axios';
import fileDownload from 'js-file-download';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-responsive-modal';
import { useNavigate } from 'react-router-dom';
import { Tooltip as ReactTooltip } from 'react-tooltip';

import {
  AnimatedVisibility,
  BodySmallBoldText,
  BodyText,
  ButtonText,
  CaptionText,
  Circle,
  CircularLoader,
  Column,
  H4LightText,
  HorizontalLine,
  Image,
  Row,
  Style
} from '../../common/styles';
import { BlueButton, CancelButton } from '../admin/style';
import { Padding } from '../discovery/tabs/style';
import { Block } from '../expandable/style';
import '@szhsin/react-menu/dist/index.css';

import 'react-responsive-modal/styles.css';

const MyServiceViewCard = ({ index, data, itemType }) => {

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  const isActivated = data['is_activated'];
  const isOwn = data['is_own']
  const name = data['name']
  const status = data['status'] !== null && data['status'] !== undefined ? data['status'] : 'undeployed';
  const id = data['id']

  const { t } = useTranslation();

  const navigate = useNavigate()

  const colItem = ({ title, caption, subtitle, }) => {
    return <Column>
      <Row justifyContent='space-between' alignItems='center'>
        <BodySmallBoldText>{title}</BodySmallBoldText>
        <CaptionText>{caption}</CaptionText>
      </Row>
      <CaptionText>{subtitle}</CaptionText>
    </Column>
  }

  const openSd = () => {
    navigate(`/provide/${itemType}/upload/${id}/edit`)
  }

  const edit = () => {
    navigate(`/lcm/${id}`)
  }

  const create = () => {
    navigate(`/lcm/${id}`)
  }

  const downloadLogs = () => {
    axios.get(process.env.REACT_APP_EDGE_API_URI + `/lcm-service/service/${id}/logs`, {
      responseType: 'blob',
    }).then(
      response => {
        fileDownload(response.data, `${name}.log`);
      }, error => {
        console.error(error);
      })
  }

  // eslint-disable-next-line react/prop-types
  const BuildDeleteDialog = ({ closeModal }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [successOrError, setSuccessOrError] = useState(null);

    const deleteService = () => {
      setIsLoading(true)
      axios.delete(process.env.REACT_APP_EDGE_API_URI + `/lcm-service/service/${id}`,).then((response) => {
        setIsLoading(false);
        setSuccessOrError(t('dashboard.delete.successfull'));
      }, (error) => {
        setIsLoading(false)
        setSuccessOrError(t('dashboard.delete.error'));
      });

    }
    const close = () => {
      setSuccessOrError(null);
      closeModal();
    }

    return <>
      <Style width='633px'>
        <Padding horizontal='24px' vertical='12px'>
          <H4LightText>{t('dashboard.delete.title')}</H4LightText>
          <HorizontalLine />
          <BodyText>
            {successOrError ? successOrError : t('dashboard.delete.message', { name: name })}
          </BodyText>
          <Padding vertical='20px'>
            <Row alignItems='center'>
              <BlueButton onClick={() => deleteService()} disabled={isLoading || successOrError}>{t('dashboard.delete.delete_button')}</BlueButton>
              <Padding paddingLeft='20px' />
              <CancelButton onClick={close} disabled={isLoading}>{t('dashboard.delete.cancel_button')}</CancelButton>
              {isLoading ? <Padding horizontal='16px'>
                <AnimatedVisibility visible={isLoading} data-tag='animated-visibility-loader'>
                  <CircularLoader />
                </AnimatedVisibility>
              </Padding> : ''}
            </Row>
          </Padding>
        </Padding>
      </Style>
    </>
  }
  const BuildManageButton = () => {

    // delete dialog confirmation
    const [openModal, setOpenModal] = useState(false);

    const onOpenModal = () => setOpenModal(true);
    const onCloseModal = () => setOpenModal(false);

    if (status === 'undeploying' || status === 'deploying') {
      return <></>
    }

    return <>
      <Padding paddingRight='16px'>
        <Menu
          menuButton={
            <ButtonText
              onClick={() => manageButton()}
              data-tip={t('dashboard.tooltip.manage')}
            >
              {t('dashboard.manage.manage')}
            </ButtonText>}>
          {
            status === 'undeployed'
              ? <MenuItem onClick={() => create()}>{t('dashboard.manage.create')}</MenuItem>
              : <></>
          }
          {
            status === 'deployed'
              ? <MenuItem onClick={() => edit()}>{t('dashboard.manage.edit')}</MenuItem>
              : <></>
          }
          {
            status === 'deployed'
              ? <MenuItem onClick={() => downloadLogs()}>{t('dashboard.manage.download-logs')}</MenuItem>
              : <></>
          }
          {
            status === 'deployed'
              ? <MenuItem onClick={onOpenModal}>{t('dashboard.manage.delete')}</MenuItem>
              : <></>
          }
        </Menu>
      </Padding>
      <Modal open={openModal} onClose={onCloseModal} center showCloseIcon={false}>
        {BuildDeleteDialog({ closeModal: onCloseModal })}
      </Modal>
    </>;
  }

  const manageButton = () => {

  }

  const getType = () => {
    switch (itemType) {
    case 'data': return 'datasets';
    default: return itemType;
    }
  };
  const BuildCard = () => {
    const [activated, setActivated] = useState(isActivated);
    const type = getType();

    const activateDeactivate = () => {
      axios.post(process.env.REACT_APP_EDGE_API_URI + `/dashboard/${type}/`,
        { id: id, is_activated: !activated }).then(
        (response) => {
          setActivated(!activated);
        }, (error) => {
          console.error(error);
        });
    }

    const buildActivateDeactivateButton = () => {

      if ((status === 'undeployed' && activated) || !activated) {
        return (
          <ButtonText onClick={activateDeactivate}>
            {
              activated ? t('dashboard.deactivate') : t('dashboard.activate')
            }
          </ButtonText>
        )
      }
      return <Style height='20px'/>;
    }

    return (
      <Style maxWidth='290px'>
        <Padding paddingRight='12px'>
          <Block border={true} borderBottom={true}>
            <Padding vertical='20px' horizontal='20px'>
              <Column>
                {isOwn ? <Circle radius='10px' background='#0000' borderColor='#0000' /> :
                  (<>{activated ? <Circle radius='10px' background='#7fcdbb' borderColor='#0000' />
                    : <Circle radius='10px' background='#ef6548' borderColor='#0000' />}</>)}

                <Style minWidth='100%'>
                  <Padding vertical='18px'>
                    {/* <Style height='160px' backgroundColor='#fafafa'/> */}
                    <Image src={data['preview_img']} alt="Logo" width='240px' height='200px' />
                  </Padding>
                </Style>
                <Row justifyContent='start' alignItems='center'>
                  <Image src={data['logo']} alt="Logo" width='50px' height='50px' />
                  <Padding horizontal='8px'>
                    {colItem({
                      title: data['name'],
                      subtitle: 'provider_url',
                    })}
                  </Padding>
                </Row>
                {!isOwn ? <CaptionText>{t('dashboard.status', { status: status })}</CaptionText> :
                  <CaptionText>&#8203;</CaptionText>}
                <Style maxWidth='213px'>
                  <Padding vertical='10px'>
                    <CaptionText>{data['description']}</CaptionText>
                  </Padding>
                </Style>

                <Padding vertical>
                  {isOwn ?
                    <ButtonText
                      onClick={() => openSd()}
                      data-tip={t('dashboard.tooltip.edit')}
                    >
                      {t('dashboard.edit')}
                    </ButtonText>
                    : <></>
                  }
                </Padding>
                <Padding vertical>{!isOwn ? <>
                  <Row>
                    {BuildManageButton()}
                    {buildActivateDeactivateButton()}
                  </Row></> :
                  <></>}
                </Padding>

              </Column>
            </Padding>
          </Block>
        </Padding>
      </Style>
    );
  }

  return BuildCard();
}

MyServiceViewCard.propTypes = {
  itemType: PropTypes.string,
  index: PropTypes.number,
  isEditable: PropTypes.bool,
  data: PropTypes.object,
};

export default MyServiceViewCard;
