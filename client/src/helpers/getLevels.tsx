export const getLevels = (level: number) => {
  switch (level) {
    case 1: {
      return '입문';
    }
    case 2: {
      return '초급';
    }
    case 3: {
      return '초중급';
    }
    case 4: {
      return '중급';
    }
    case 5: {
      return '고급';
    }
  }
};
