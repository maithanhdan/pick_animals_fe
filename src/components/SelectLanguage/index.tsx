import { STORAGE } from '@/constant/keyStoage';
import { LocalStore } from '@/helpers/local';
import i18n from '@/translate/i18n';
import React, { FC } from 'react';
import styled from 'styled-components';
const WrapperStyled = styled.div`
  height: 100px;
  width: 100px;
  background-color: wheat;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SelectStyled = styled.select`
  min-width: 80px;
`;
const SelectLanguage: FC = () => {
  const LIST_LANG = [
    { value: 'en', label: 'EN' },
    { value: 'vi', label: 'VI' },
  ];
  const handleChangeLanguage = () => {
    if (LocalStore.get(STORAGE.LANGUAGE) === 'vi') {
      i18n.changeLanguage('en');
      LocalStore.set(STORAGE.LANGUAGE, 'en');
    } else {
      LocalStore.set(STORAGE.LANGUAGE, 'vi');
      i18n.changeLanguage('vi');
    }
  };
  return (
    <WrapperStyled>
      <SelectStyled onChange={handleChangeLanguage}>
        {LIST_LANG.map((lang) => (
          <option
            value={lang.value}
            key={lang.value}
            selected={i18n.language === lang.value}
          >
            {lang.label}
          </option>
        ))}
      </SelectStyled>
    </WrapperStyled>
  );
};

export default SelectLanguage;
