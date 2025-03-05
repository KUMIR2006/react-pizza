import React from 'react';
import debounce from 'lodash.debounce';
import styles from "./Search.module.scss"
import { useSelector, useDispatch } from 'react-redux';
import { selectFilter } from '../../redux/pizza/selectors';
import { setSearchValue } from '../../redux/filter/slice';

const Search: React.FC = () => {
  const dispatch = useDispatch()
  const { searchValue } = useSelector(selectFilter)

  const [value, setValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null)
 
  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current?.focus();
  }

  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    },250),
    [],
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  }

  return (
    <div className={styles.root}>

      <svg 
          className={styles.icon}
          xmlns="http://www.w3.org/2000/svg" 
          width="17px" height="18px" 
          viewBox="0 0 17 18">
            <title>search</title>
            <desc>Created with Sketch.</desc>
            <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="Rounded" transform="translate(-545.000000, -421.000000)">
                    <g id="Action" transform="translate(100.000000, 100.000000)">
                        <g id="-Round-/-Action-/-search" transform="translate(442.000000, 318.000000)">
                            <g>
                                <polygon id="Path" points="0 0 24 0 24 24 0 24"/>
                                <path d="M15.5,14 L14.71,14 L14.43,13.73 C15.63,12.33 16.25,10.42 15.91,8.39 C15.44,5.61 13.12,3.39 10.32,3.05 C6.09,2.53 2.53,6.09 3.05,10.32 C3.39,13.12 5.61,15.44 8.39,15.91 C10.42,16.25 12.33,15.63 13.73,14.43 L14,14.71 L14,15.5 L18.25,19.75 C18.66,20.16 19.33,20.16 19.74,19.75 C20.15,19.34 20.15,18.67 19.74,18.26 L15.5,14 Z M9.5,14 C7.01,14 5,11.99 5,9.5 C5,7.01 7.01,5 9.5,5 C11.99,5 14,7.01 14,9.5 C14,11.99 11.99,14 9.5,14 Z" id="🔹Icon-Color" fill="#1D1D1D"/>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
      </svg>

      <input 
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input} 
        placeholder="Поиск пиццы..." 
      />


      {searchValue && (
        <svg 
        onClick={onClickClear}
        className={styles.close}
        xmlns="http://www.w3.org/2000/svg" 
        version="1.1" 
        id="Capa_1" 
        viewBox="0 0 612.043 612.043" 
        >
          <g>
            <g id="cross">
              <g>
                <path d="M397.503,306.011l195.577-195.577c25.27-25.269,25.27-66.213,0-91.482c-25.269-25.269-66.213-25.269-91.481,0     L306.022,214.551L110.445,18.974c-25.269-25.269-66.213-25.269-91.482,0s-25.269,66.213,0,91.482L214.54,306.033L18.963,501.61     c-25.269,25.269-25.269,66.213,0,91.481c25.269,25.27,66.213,25.27,91.482,0l195.577-195.576l195.577,195.576     c25.269,25.27,66.213,25.27,91.481,0c25.27-25.269,25.27-66.213,0-91.481L397.503,306.011z"/>
              </g>
            </g>
          </g>
        </svg>
      )}
    </div>
  )
}
export default Search