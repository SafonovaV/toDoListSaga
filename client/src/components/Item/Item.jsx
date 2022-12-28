import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  startChangeStatusCaseAC,
  startDeleteCaseAC,
} from '../../store/cases/casesCreators';
import { setVisModalTrue, initEditCase } from '../../store/modal/modalCreators';
import cl from './Item.module.css';

export default function Item() {
  const dispatch = useDispatch();
  const cases = useSelector((state) => state.cases.cases);

  const changeStatus = (oneCase) => {
    dispatch(startChangeStatusCaseAC(oneCase));
  };

  const deleteItem = (id) => {
    dispatch(startDeleteCaseAC(id));
  };
  const modalFunction = (editCase) => {
    dispatch(setVisModalTrue());
    dispatch(initEditCase(editCase));
  };

  return (
    <div className={cl.block}>
      {cases.map((el) => (
        <div className={cl.block_item} key={el.id}>
          {el.status ? (
            <>
              <input
                onChange={() => {
                  changeStatus(el);
                }}
                type="checkbox"
                defaultChecked
              />
              <div className={cl.block_img}>
                <img className={cl.img} src="./img/gal.png" alt="as" />
              </div>
              <p className={cl.block_done}>{el.title}</p>
            </>
          ) : (
            <>
              <input
                type="checkbox"
                onChange={() => {
                  changeStatus(el);
                }}
              />
              <div className={cl.block_img}>
                <img className={cl.img} src="./img/min.png" alt="as" />
              </div>
              <p className={cl.block_notdone}>{el.title}</p>
            </>
          )}

          <div
            onClick={() => {
              modalFunction(el);
            }}
            className={cl.block_img}
          >
            <img className={cl.img} src="./img/edit.png" alt="as" />
          </div>
          <div
            className={cl.block_img}
            onClick={() => {
              return deleteItem(el.id);
            }}
          >
            <img className={cl.img} src="./img/cors.png" alt="as" />
          </div>
        </div>
      ))}
    </div>
  );
}
