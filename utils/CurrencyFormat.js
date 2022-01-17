import React from "react";

export const convertCostToString = ( cost ) => {
  var formatter = new Intl.NumberFormat('vn-VN', {
    style: 'currency',
    currency: 'VND',
  });
  return formatter.format(cost);
}