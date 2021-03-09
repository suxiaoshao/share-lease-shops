import React from 'react';
import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@material-ui/core';
import { GoodProp, GoodType } from '../../utils/http/good/goodList';
import { useFormStyle } from '../../utils/hook/useFornStyle';
import UploadImage from '../common/uploadImage';
import { makeStyles } from '@material-ui/core/styles';
import { getFileFromUrl } from '../../utils/getFilefromUrl';
import { updateGood } from '../../utils/http/shop/updateGood';
import PriceInput from '../common/priceInput';
import { shopInfoStore } from '../../utils/store/shopInfo.store';
import { upload } from '../../utils/http/uploadImg';
import { baseUrl } from '../../utils/http/main';
import { useAsyncFnWithNotify } from '../../utils/hook/useAsyncFnWithNotify';

interface GoodEditProp {
  /**
   * 修改对话框是否打开
   * */
  open: boolean;

  /**
   * 关闭修改框
   * */
  onClose(): void;

  /**
   * 商品信息
   * */
  goodItem: GoodProp;
}

const useStyle = makeStyles(() =>
  createStyles({
    image: {
      width: 160,
      height: 100,
    },
  }),
);

export default function GoodEdit(props: GoodEditProp): JSX.Element {
  const classes = useFormStyle();
  const imageClasses = useStyle();
  /**
   * 新商品名字
   * */
  const [newName, setNewName] = React.useState(props.goodItem.name);
  /**
   * 新描述
   * */
  const [newInfo, setNewInfo] = React.useState(props.goodItem.info);
  /**
   * 新图片
   * */
  const [newImage, setImage] = React.useState(props.goodItem.picUrl);
  /**
   * 新类型
   * */
  const [newType, setNewType] = React.useState(props.goodItem.type);
  /**
   * 新价格
   * */
  const [newPrice, setNewPrice] = React.useState(props.goodItem.price);
  /**
   * 上传接口
   * */
  const [state, fetch] = useAsyncFnWithNotify(
    async () => {
      let src = newImage;
      /**
       * 获取图片 url
       * */
      if (newImage !== props.goodItem.picUrl) {
        const file = await getFileFromUrl(newImage);
        src = `${baseUrl}/file/${await upload(file)}`;
      }
      await updateGood(props.goodItem.gid, newName, newType, src, newPrice, newInfo);
      shopInfoStore.updateGood({
        ...props.goodItem,
        name: newName,
        type: newType,
        picUrl: src,
        price: newPrice,
        info: newInfo,
      });
      props.onClose();
    },
    '更新信息成功',
    [newImage, newInfo, newName, newPrice, newType, props.goodItem, props.onClose],
  );
  return (
    <Dialog maxWidth={'sm'} open={props.open} onClose={props.onClose}>
      <DialogTitle>修改商品信息</DialogTitle>
      <DialogContent>
        <DialogContentText>修改</DialogContentText>
        <TextField
          label={'商品名'}
          fullWidth
          value={newName}
          onChange={(event) => {
            setNewName(event.target.value);
          }}
          className={classes.input}
        />
        <PriceInput price={newPrice} onChangePrice={setNewPrice} className={classes.input} />
        <TextField
          label={'商品描述'}
          fullWidth
          value={newInfo}
          onChange={(event) => {
            setNewInfo(event.target.value);
          }}
          className={classes.input}
        />
        <FormControl className={classes.input}>
          <FormLabel component="legend">商品类型</FormLabel>
          <RadioGroup
            row
            value={newType}
            onChange={(event) => {
              setNewType(event.target.value as GoodType);
            }}
          >
            <FormControlLabel value="电子器件" control={<Radio />} label="电子器件" />
          </RadioGroup>
        </FormControl>
        <FormControl fullWidth className={classes.input}>
          <Typography variant={'caption'} color={'textSecondary'} component={'label'}>
            图片
          </Typography>
          <UploadImage onChangeSrc={setImage} className={imageClasses.image} src={newImage} />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button color={'secondary'} onClick={props.onClose}>
          取消
        </Button>
        <Button
          onClick={() => {
            setImage(props.goodItem.picUrl);
            setNewInfo(props.goodItem.info);
            setNewName(props.goodItem.name);
            setNewType(props.goodItem.type);
            setNewPrice(props.goodItem.price);
          }}
        >
          还原
        </Button>
        <Button color={'primary'} onClick={fetch} disabled={state.loading}>
          确定
        </Button>
      </DialogActions>
    </Dialog>
  );
}
