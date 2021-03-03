import React from 'react';
import { Button, DialogActions, IconButton, InputAdornment, TextField, Tooltip } from '@material-ui/core';
import { Dialpad, Email, Lock, Send } from '@material-ui/icons';
import { useAccountStyle } from './userAccount';
import { resetPassword } from '../../utils/http/user/resetPassword';
import { resetPwdMail } from '../../utils/http/user/resetPwdMail';
import { asyncFunc } from '../../utils/hook/asyncFunc';

export interface ForgetProp {
  /**
   * 成功重置密码的
   * @param newEmail 邮箱
   * @param newPassword 新密码
   * */
  onSuccess(newEmail: string, newPassword: string): void;
}

export function Forget(props: ForgetProp): JSX.Element {
  const classes = useAccountStyle();
  /**
   * 新密码
   * */
  const [password, setPassword] = React.useState<string>('');
  /**
   * 邮箱
   * */
  const [email, setEmail] = React.useState<string>('');
  /**
   * 验证码
   * */
  const [code, setCode] = React.useState<string>('');
  return (
    <form className={classes.form}>
      <TextField
        className={classes.input}
        label="email"
        fullWidth
        type={'email'}
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position={'end'}>
              <Tooltip title={'发送验证码'}>
                <IconButton
                  onClick={() => {
                    asyncFunc(() => {
                      return resetPwdMail(email);
                    }, '成功发送验证码').then();
                  }}
                >
                  <Send />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        className={classes.input}
        label={'验证码'}
        value={code}
        fullWidth
        onChange={(event) => {
          setCode(event.target.value);
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Dialpad />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        className={classes.input}
        label="新密码"
        fullWidth
        type={'password'}
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock />
            </InputAdornment>
          ),
        }}
      />
      <DialogActions>
        <Button
          onClick={() => {
            asyncFunc(() => {
              return resetPassword(email, password, code);
            }, '成功重置密码').then(() => {
              props.onSuccess(email, password);
            });
          }}
          variant="contained"
          color={'primary'}
        >
          重置密码
        </Button>
      </DialogActions>
    </form>
  );
}
