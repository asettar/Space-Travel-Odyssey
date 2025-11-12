// var findMaxForm = function(strs, m, n) {
//     let dp = Array(m + 1).map(e => Array(n).fill(-1));
//     let rec = (idx, leftZeros, leftOnes) => {
//         if (idx >= strs.length) return 0;
//         if (dp[idx][lef])
//         let ans = rec(idx + 1, leftZeros, leftOnes);
        
//         let cnt0 = strs[idx].split('0').length - 1; 
//         let cnt1 = strs[idx].split('1').length - 1;
//         // console.log(idx, leftZeros, leftOnes);
//         // console.log(cnt0, cnt1);
//         if (cnt0 <= leftZeros && cnt1 <= leftOnes)
//             ans = Math.max(ans, 1 + rec(idx + 1, leftZeros - cnt0, leftOnes - cnt1));
//         return ans;
//     }
//     return rec(0, m, n);
// };

// console.log(findMaxForm(["10","0001","111001","1","0"], 5, 3));
// console.log(findMaxForm(["10","0","1"], 1, 1));
