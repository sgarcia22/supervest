// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.7.6;
pragma abicoder v2;

import '@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol';
import '@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol';

contract Swap {
    // Swap Router to perform swap on Uniswap
    address private constant SWAP_ROUTER =
        0xE592427A0AEce92De3Edee1F18E0157C05861564;

    ISwapRouter public immutable swapRouter = ISwapRouter(SWAP_ROUTER);

    // Pool fee to 0.3%.
    uint24 public constant poolFee = 3000;

    // Transfer tokens from caller to pool and approve Uniswap to use the tokens from our contract.
    function safeTransferWithApprove(address tokenAddress, uint256 amountIn, address routerAddress)
        internal
    {
        TransferHelper.safeTransferFrom(
            tokenAddress,
            msg.sender,
            address(this),
            amountIn
        );

        TransferHelper.safeApprove(tokenAddress, routerAddress, amountIn);
    }

    /// @notice swapExactInputSingle swaps a fixed amount of DAI for a maximum possible amount of WETH9
    /// using the DAI/WETH9 0.3% pool by calling `exactInputSingle` in the swap router.
    /// @dev The calling address must approve this contract to spend at least `amountIn` worth of its DAI for this function to succeed.
    /// @param amountIn The exact amount of DAI that will be swapped for WETH9.
    /// @return amountOut The amount of WETH9 received.
    function swapExactInputSingle(address tokenAddressIn, uint256 amountIn, address tokenAddressOut) external returns (uint256 amountOut) {
        // msg.sender must approve this contract

        // Manually approve your contract to spend the token in the caller wallet
        // if (IERC20(tokenAddressIn).allowance(address(swapRouter), msg.sender) == 0){ 
        //     IERC20(tokenAddressIn).approve(address(swapRouter), amountIn);
        // }
        // else {
        //     IERC20(tokenAddressIn).safeIncreaseAllowance(address(swapRouter), amountIn);
        // }
        // Transfer the specified amount of DAI to this contract.
        // safeTransferWithApprove(tokenAddressIn, amountIn, address(swapRouter));

        TransferHelper.safeTransferFrom(
            tokenAddressIn,
            msg.sender,
            address(this),
            amountIn
        );

        // Contract approving the swap router
        TransferHelper.safeApprove(tokenAddressIn, address(swapRouter), amountIn);


        // amountOut = 0;
        // Naively set amountOutMinimum to 0. In production, use an oracle or other data source to choose a safer value for amountOutMinimum.
        // We also set the sqrtPriceLimitx96 to be 0 to ensure we swap our exact input amount.
        ISwapRouter.ExactInputSingleParams memory params =
            ISwapRouter.ExactInputSingleParams({
                tokenIn: tokenAddressIn,
                tokenOut: tokenAddressOut,
                fee: poolFee,
                recipient: msg.sender,
                deadline: block.timestamp,
                amountIn: amountIn,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });

            
        // The call to `exactInputSingle` executes the swap.
        amountOut = swapRouter.exactInputSingle(params);
    }
}