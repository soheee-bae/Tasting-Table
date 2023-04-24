import React from 'react';
import styles from './banner.module.scss';
import Button from 'components/Button/button';

export default function Banner() {
  return (
    <div className={styles.banner}>
      <p>
        자랑하고 싶은 나만의 레시피! 공유하고 싶은 멋진 레시피를 올리시고 다른 회원님들과
        이야기해보세요!
      </p>
      <Button
        className={styles.bannerButton}
        size="sm"
        variant="outlined-text"
        onClick={() => window.open('/newrecipe', '_self')}>
        레시피 등록하러 가기
      </Button>
    </div>
  );
}
