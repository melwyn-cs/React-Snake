var ViewProps = (function () {

  let bIsFoodEaten = false;

  return {

    getFoodEaten: function () {
      return bIsFoodEaten;
    },

    setFoodEaten: function (_bIsFoodEaten) {
      bIsFoodEaten = _bIsFoodEaten;
    }

  };

})();

module.exports = ViewProps;