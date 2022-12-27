import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startInitCasesAC } from '../../store/cases/casesCreators';
import { getIsLoading } from '../../store/isLoading/selector';
import Item from '../Item/Item';
import cl from './List.module.css';
import AppLoader from '../Loading/Loading';

export default function List() {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading());

  useEffect(() => {
    dispatch(startInitCasesAC());
  }, []);

  if (isLoading) {
    return <AppLoader />;
  }

  return (
    <div className={cl.block_list}>
      <h1> Список дел</h1>

      <Item />
    </div>
  );
}
