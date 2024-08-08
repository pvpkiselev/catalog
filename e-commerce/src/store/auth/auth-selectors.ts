import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../store';

const selectAuthState = (state: AppState) => state.auth;

export const selectAuthStatus = createSelector([selectAuthState], (authState) => authState.status);

export const selectIsAuth = createSelector([selectAuthState], (authState) => authState.isAuth);
export const selectUserName = createSelector([selectAuthState], (authState) => authState.name);
export const selectUserEmail = createSelector([selectAuthState], (authState) => authState.email);
export const selectUserAvatar = createSelector([selectAuthState], (authState) => authState.avatar);
