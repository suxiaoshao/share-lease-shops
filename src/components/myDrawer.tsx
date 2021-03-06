import React from 'react';
import {
  Avatar,
  Badge,
  createStyles,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { Add, Brightness4, Brightness7, ExitToApp, Home, ListAlt, Settings, ShoppingBasket } from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import UserAccount from './userAccount/userAccount';
import { useShopInfo } from '../utils/store/shopInfo.store';
import { userInfoStore } from '../utils/store/userInfo.store';
import { useStatusTotalNum } from '../utils/store/shopStatus.store';
import { IsDarkContext } from '../utils/hook/useIsDark';

const useStyle = makeStyles(() => {
  const listWidth = 240;
  return createStyles({
    page: {
      display: 'flex',
      width: '100%',
      height: '100%',
    },
    myDrawer: {
      flex: `0 0 ${listWidth}px`,
      display: 'flex',
      flexDirection: 'column',
      maxWidth: listWidth,
    },
    drawerPaper: {
      width: listWidth,
    },
    main: {
      flex: '1 1 0',
      maxWidth: `calc(100vw - ${listWidth}px)`,
    },
  });
});

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 侧边栏路由按钮的 prop
 * */
export interface MyRouterListItemProp {
  /**
   * 按钮 icon
   * */
  icon: JSX.Element;
  /**
   * 显示的文字
   * */
  text: string;
  /**
   * 按钮指向的路径
   * */
  path: string;
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 侧边栏按钮
 * */
function MyRouterListItem(props: MyRouterListItemProp) {
  /**
   * 路由信息
   * */
  const myLocation = useLocation();
  /**
   * 跳转
   * */
  const myHistory = useHistory();
  return (
    <ListItem
      onClick={() => {
        myHistory.push(props.path);
      }}
      button
      selected={myLocation.pathname === props.path}
    >
      <ListItemIcon>{props.icon}</ListItemIcon>
      <ListItemText>{props.text}</ListItemText>
    </ListItem>
  );
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 侧边栏组件的 prop
 * */
interface MyDrawerProps {
  /**
   * 子组件
   * */
  children: React.ReactNode;
  /**
   * 类名
   * */
  className?: string;
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 侧边栏组件
 * */
export default function MyDrawer(props: MyDrawerProps): JSX.Element {
  const classes = useStyle();
  const [shopInfo] = useShopInfo();
  const [statusTotalNum] = useStatusTotalNum();
  const { isDark, setIsDark } = React.useContext(IsDarkContext);
  return (
    <div className={classes.page}>
      <Drawer
        classes={{
          paper: classes.drawerPaper,
        }}
        variant="persistent"
        anchor="left"
        open
        className={classes.myDrawer}
      >
        <List component="nav">
          <ListItem>
            <ListItemAvatar>
              <Avatar src={'https://si.geilicdn.com/vshop-shop-logo-default.jpg'} />
            </ListItemAvatar>
            <ListItemText
              primary={shopInfo?.name}
              secondaryTypographyProps={{ noWrap: true }}
              secondary={shopInfo?.info}
            />
          </ListItem>
        </List>
        <Divider />
        <List component="nav">
          <MyRouterListItem path="/" icon={<Home />} text={'首页'} />
          <MyRouterListItem icon={<Settings />} text={'商店设置'} path={'/setting'} />
          <MyRouterListItem icon={<ShoppingBasket />} text={'商品设置'} path={'/goods'} />
          <MyRouterListItem icon={<Add />} text={'添加商品'} path={'/good/new'} />
          <MyRouterListItem
            icon={
              <Badge badgeContent={statusTotalNum} color={'secondary'}>
                <ListAlt />
              </Badge>
            }
            text={'订单'}
            path={'/orders'}
          />
        </List>
        <Divider />
        <List component="nav">
          <ListItem
            button
            onClick={() => {
              userInfoStore.setData(null);
            }}
          >
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText>退出登陆</ListItemText>
          </ListItem>
          <ListItem
            button
            onClick={() => {
              setIsDark(!isDark);
            }}
          >
            <ListItemIcon>{isDark ? <Brightness4 /> : <Brightness7 />}</ListItemIcon>
            <ListItemText>{isDark ? '深色模式' : '明亮模式'}</ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <UserAccount />
      <main className={`${props.className} ${classes.main}`}>{props.children}</main>
    </div>
  );
}
