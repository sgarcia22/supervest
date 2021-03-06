// Helper functions for programmatic Uniswap swap

// Query pool to grab immutable variables from it
exports.getPoolImmutables = async (poolContract) => {
    // Grab several values from the pool
    const [token0, token1, fee] = await Promise.all([
      poolContract.token0(),
      poolContract.token1(),
      poolContract.fee()
    ]);
    const immutables = {
      token0: token0,
      token1: token1,
      fee: fee
    };
    return immutables;
}

// Query pool to grab mutable variables from it
exports.getPoolState = async (poolContract) => {
    const slot = poolContract.slot0();
    // Retrieve the price of the current token from the pool
    const state = {
        // Square root of the price
        sqrtPriceX96: slot[0]
    };
    return state;
}

exports.getDate = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy;
  return today;
}