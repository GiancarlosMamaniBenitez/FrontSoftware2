"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/VerTarjeta/page",{

/***/ "(app-client)/./src/app/VerTarjeta/tarjeta.css":
/*!****************************************!*\
  !*** ./src/app/VerTarjeta/tarjeta.css ***!
  \****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"30f59bac4e0e\");\nif (true) { module.hot.accept() }\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1jbGllbnQpLy4vc3JjL2FwcC9WZXJUYXJqZXRhL3RhcmpldGEuY3NzLmpzIiwibWFwcGluZ3MiOiI7QUFBQSwrREFBZSxjQUFjO0FBQzdCLElBQUksSUFBVSxJQUFJLGlCQUFpQiIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvYXBwL1ZlclRhcmpldGEvdGFyamV0YS5jc3M/NTVkNiJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBcIjMwZjU5YmFjNGUwZVwiXG5pZiAobW9kdWxlLmhvdCkgeyBtb2R1bGUuaG90LmFjY2VwdCgpIH1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-client)/./src/app/VerTarjeta/tarjeta.css\n"));

/***/ }),

/***/ "(app-client)/./src/app/VerTarjeta/page.js":
/*!************************************!*\
  !*** ./src/app/VerTarjeta/page.js ***!
  \************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-client)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-client)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _Components_ButtonAgregarTarjeta__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/Components/ButtonAgregarTarjeta */ \"(app-client)/./src/Components/ButtonAgregarTarjeta.jsx\");\n/* harmony import */ var _Components_ButtonEliminarTarjeta__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/Components/ButtonEliminarTarjeta */ \"(app-client)/./src/Components/ButtonEliminarTarjeta.jsx\");\n/* harmony import */ var _Components_MenuNuevo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/Components/MenuNuevo */ \"(app-client)/./src/Components/MenuNuevo.jsx\");\n/* harmony import */ var _tarjeta_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tarjeta.css */ \"(app-client)/./src/app/VerTarjeta/tarjeta.css\");\n/* __next_internal_client_entry_do_not_use__  auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\nfunction VerTarjeta() {\n    _s();\n    const [userCards, setUserCards] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const maxCardLimit = 5;\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const userIsLoggedIn = localStorage.getItem(\"userLoggedIn\") === \"true\";\n        if (userIsLoggedIn) {\n            const authenticatedUser = JSON.parse(localStorage.getItem(\"currentUser\"));\n            if (authenticatedUser && authenticatedUser.cards) {\n                setUserCards(authenticatedUser.cards);\n            }\n        }\n    }, []);\n    const handleCardDeletion = (cardType)=>{\n        const updatedUserCards = userCards.filter((card)=>card.type !== cardType);\n        const authenticatedUser = JSON.parse(localStorage.getItem(\"currentUser\"));\n        if (authenticatedUser) {\n            authenticatedUser.cards = updatedUserCards;\n            localStorage.setItem(\"currentUser\", JSON.stringify(authenticatedUser));\n            setUserCards(updatedUserCards);\n        }\n    };\n    const handleCardDetails = (cardType)=>{\n        window.location.href = \"/Edit-card?cardType=\".concat(cardType);\n    };\n    const handleCardAddition = (cardType)=>{\n        if (userCards.length >= maxCardLimit) {\n            alert(\"No puedes agregar m\\xe1s de 5 tarjetas.\");\n            return;\n        }\n        const authenticatedUser = JSON.parse(localStorage.getItem(\"currentUser\"));\n        if (authenticatedUser) {\n            if (Array.isArray(authenticatedUser.cards)) {\n                authenticatedUser.cards.push({\n                    type: cardType,\n                    data: {}\n                });\n            } else {\n                authenticatedUser.cards = [\n                    {\n                        type: cardType,\n                        data: {}\n                    }\n                ];\n            }\n            localStorage.setItem(\"currentUser\", JSON.stringify(authenticatedUser));\n            setUserCards([\n                ...userCards,\n                {\n                    type: cardType,\n                    data: {}\n                }\n            ]);\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Components_MenuNuevo__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {}, void 0, false, {\n                fileName: \"C:\\\\Users\\\\rfjua\\\\Desktop\\\\FrontSoftware2\\\\src\\\\app\\\\VerTarjeta\\\\page.js\",\n                lineNumber: 63,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"Agregar\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                        children: \"TARJETAS REGISTRADAS\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\rfjua\\\\Desktop\\\\FrontSoftware2\\\\src\\\\app\\\\VerTarjeta\\\\page.js\",\n                        lineNumber: 65,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        children: userCards && userCards.length > 0 ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                                    children: \"\\xbfDesea eliminar alguna tarjeta o ver m\\xe1s detalles?\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\rfjua\\\\Desktop\\\\FrontSoftware2\\\\src\\\\app\\\\VerTarjeta\\\\page.js\",\n                                    lineNumber: 69,\n                                    columnNumber: 15\n                                }, this),\n                                userCards.map((card, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        className: \"card-option\",\n                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                            className: \"card-image-container\",\n                                            children: [\n                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                                                    src: \"/\".concat(card.type, \".png\"),\n                                                    alt: card.type,\n                                                    className: \"card-image\"\n                                                }, void 0, false, {\n                                                    fileName: \"C:\\\\Users\\\\rfjua\\\\Desktop\\\\FrontSoftware2\\\\src\\\\app\\\\VerTarjeta\\\\page.js\",\n                                                    lineNumber: 73,\n                                                    columnNumber: 21\n                                                }, this),\n                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                                    onClick: ()=>handleCardDeletion(card.type),\n                                                    className: \"card-button\",\n                                                    children: \"Eliminar\"\n                                                }, void 0, false, {\n                                                    fileName: \"C:\\\\Users\\\\rfjua\\\\Desktop\\\\FrontSoftware2\\\\src\\\\app\\\\VerTarjeta\\\\page.js\",\n                                                    lineNumber: 74,\n                                                    columnNumber: 21\n                                                }, this),\n                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                                    onClick: ()=>handleCardDetails(card.type),\n                                                    className: \"card-button\",\n                                                    children: \"Ver m\\xe1s\"\n                                                }, void 0, false, {\n                                                    fileName: \"C:\\\\Users\\\\rfjua\\\\Desktop\\\\FrontSoftware2\\\\src\\\\app\\\\VerTarjeta\\\\page.js\",\n                                                    lineNumber: 80,\n                                                    columnNumber: 21\n                                                }, this)\n                                            ]\n                                        }, void 0, true, {\n                                            fileName: \"C:\\\\Users\\\\rfjua\\\\Desktop\\\\FrontSoftware2\\\\src\\\\app\\\\VerTarjeta\\\\page.js\",\n                                            lineNumber: 72,\n                                            columnNumber: 19\n                                        }, this)\n                                    }, index, false, {\n                                        fileName: \"C:\\\\Users\\\\rfjua\\\\Desktop\\\\FrontSoftware2\\\\src\\\\app\\\\VerTarjeta\\\\page.js\",\n                                        lineNumber: 71,\n                                        columnNumber: 17\n                                    }, this)),\n                                userCards.length < maxCardLimit && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Components_ButtonAgregarTarjeta__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                                    handleCardAddition: handleCardAddition\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\rfjua\\\\Desktop\\\\FrontSoftware2\\\\src\\\\app\\\\VerTarjeta\\\\page.js\",\n                                    lineNumber: 90,\n                                    columnNumber: 17\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\Users\\\\rfjua\\\\Desktop\\\\FrontSoftware2\\\\src\\\\app\\\\VerTarjeta\\\\page.js\",\n                            lineNumber: 68,\n                            columnNumber: 13\n                        }, this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                                    children: \"\\xbfQu\\xe9 tipo de tarjeta desea registrar?\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\rfjua\\\\Desktop\\\\FrontSoftware2\\\\src\\\\app\\\\VerTarjeta\\\\page.js\",\n                                    lineNumber: 95,\n                                    columnNumber: 15\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Components_ButtonAgregarTarjeta__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                                    handleCardAddition: handleCardAddition\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\rfjua\\\\Desktop\\\\FrontSoftware2\\\\src\\\\app\\\\VerTarjeta\\\\page.js\",\n                                    lineNumber: 96,\n                                    columnNumber: 15\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\Users\\\\rfjua\\\\Desktop\\\\FrontSoftware2\\\\src\\\\app\\\\VerTarjeta\\\\page.js\",\n                            lineNumber: 94,\n                            columnNumber: 13\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\rfjua\\\\Desktop\\\\FrontSoftware2\\\\src\\\\app\\\\VerTarjeta\\\\page.js\",\n                        lineNumber: 66,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\rfjua\\\\Desktop\\\\FrontSoftware2\\\\src\\\\app\\\\VerTarjeta\\\\page.js\",\n                lineNumber: 64,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\rfjua\\\\Desktop\\\\FrontSoftware2\\\\src\\\\app\\\\VerTarjeta\\\\page.js\",\n        lineNumber: 62,\n        columnNumber: 5\n    }, this);\n}\n_s(VerTarjeta, \"bgUd2BF6sUh3EsFvaLXO76SKj5A=\");\n_c = VerTarjeta;\n/* harmony default export */ __webpack_exports__[\"default\"] = (VerTarjeta);\nvar _c;\n$RefreshReg$(_c, \"VerTarjeta\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1jbGllbnQpLy4vc3JjL2FwcC9WZXJUYXJqZXRhL3BhZ2UuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUd5QztBQUM0QjtBQUNFO0FBQ3hCO0FBQ2Q7QUFDWDtBQUN0QixTQUFTTSxhQUFhOztJQUNwQixNQUFNLENBQUNDLFdBQVdDLGFBQWEsR0FBR0gsK0NBQVFBLENBQUMsRUFBRTtJQUM3QyxNQUFNSSxlQUFlO0lBRXJCUixnREFBU0EsQ0FBQyxJQUFNO1FBQ2QsTUFBTVMsaUJBQWlCQyxhQUFhQyxPQUFPLENBQUMsb0JBQW9CO1FBRWhFLElBQUlGLGdCQUFnQjtZQUNsQixNQUFNRyxvQkFBb0JDLEtBQUtDLEtBQUssQ0FBQ0osYUFBYUMsT0FBTyxDQUFDO1lBRTFELElBQUlDLHFCQUFxQkEsa0JBQWtCRyxLQUFLLEVBQUU7Z0JBQ2hEUixhQUFhSyxrQkFBa0JHLEtBQUs7WUFDdEMsQ0FBQztRQUNILENBQUM7SUFDSCxHQUFHLEVBQUU7SUFFTCxNQUFNQyxxQkFBcUIsQ0FBQ0MsV0FBYTtRQUN2QyxNQUFNQyxtQkFBbUJaLFVBQVVhLE1BQU0sQ0FBQyxDQUFDQyxPQUFTQSxLQUFLQyxJQUFJLEtBQUtKO1FBQ2xFLE1BQU1MLG9CQUFvQkMsS0FBS0MsS0FBSyxDQUFDSixhQUFhQyxPQUFPLENBQUM7UUFFMUQsSUFBSUMsbUJBQW1CO1lBQ3JCQSxrQkFBa0JHLEtBQUssR0FBR0c7WUFDMUJSLGFBQWFZLE9BQU8sQ0FBQyxlQUFlVCxLQUFLVSxTQUFTLENBQUNYO1lBQ25ETCxhQUFhVztRQUNmLENBQUM7SUFDSDtJQUVBLE1BQU1NLG9CQUFvQixDQUFDUCxXQUFhO1FBQ3RDUSxPQUFPQyxRQUFRLENBQUNDLElBQUksR0FBRyx1QkFBZ0MsT0FBVFY7SUFDaEQ7SUFFQSxNQUFNVyxxQkFBcUIsQ0FBQ1gsV0FBYTtRQUN2QyxJQUFJWCxVQUFVdUIsTUFBTSxJQUFJckIsY0FBYztZQUNwQ3NCLE1BQU07WUFDTjtRQUNGLENBQUM7UUFFRCxNQUFNbEIsb0JBQW9CQyxLQUFLQyxLQUFLLENBQUNKLGFBQWFDLE9BQU8sQ0FBQztRQUUxRCxJQUFJQyxtQkFBbUI7WUFDckIsSUFBSW1CLE1BQU1DLE9BQU8sQ0FBQ3BCLGtCQUFrQkcsS0FBSyxHQUFHO2dCQUMxQ0gsa0JBQWtCRyxLQUFLLENBQUNrQixJQUFJLENBQUM7b0JBQUVaLE1BQU1KO29CQUFVaUIsTUFBTSxDQUFDO2dCQUFFO1lBQzFELE9BQU87Z0JBQ0x0QixrQkFBa0JHLEtBQUssR0FBRztvQkFBQzt3QkFBRU0sTUFBTUo7d0JBQVVpQixNQUFNLENBQUM7b0JBQUU7aUJBQUU7WUFDMUQsQ0FBQztZQUVEeEIsYUFBYVksT0FBTyxDQUFDLGVBQWVULEtBQUtVLFNBQVMsQ0FBQ1g7WUFDbkRMLGFBQWE7bUJBQUlEO2dCQUFXO29CQUFFZSxNQUFNSjtvQkFBVWlCLE1BQU0sQ0FBQztnQkFBRTthQUFFO1FBQzNELENBQUM7SUFDSDtJQUVBLHFCQUNFLDhEQUFDQzs7MEJBQ0MsOERBQUNoQyw2REFBU0E7Ozs7OzBCQUNWLDhEQUFDZ0M7Z0JBQUlDLFdBQVU7O2tDQUNiLDhEQUFDQztrQ0FBRzs7Ozs7O2tDQUNKLDhEQUFDRjtrQ0FDRTdCLGFBQWFBLFVBQVV1QixNQUFNLEdBQUcsa0JBQy9CLDhEQUFDTTs7OENBQ0MsOERBQUNHOzhDQUFHOzs7Ozs7Z0NBQ0hoQyxVQUFVaUMsR0FBRyxDQUFDLENBQUNuQixNQUFNb0Isc0JBQ3BCLDhEQUFDTDt3Q0FBZ0JDLFdBQVU7a0RBQ3pCLDRFQUFDRDs0Q0FBSUMsV0FBVTs7OERBQ2IsOERBQUNLO29EQUFJQyxLQUFLLElBQWMsT0FBVnRCLEtBQUtDLElBQUksRUFBQztvREFBT3NCLEtBQUt2QixLQUFLQyxJQUFJO29EQUFFZSxXQUFVOzs7Ozs7OERBQ3pELDhEQUFDUTtvREFDQ0MsU0FBUyxJQUFNN0IsbUJBQW1CSSxLQUFLQyxJQUFJO29EQUMzQ2UsV0FBVTs4REFDWDs7Ozs7OzhEQUdELDhEQUFDUTtvREFDQ0MsU0FBUyxJQUFNckIsa0JBQWtCSixLQUFLQyxJQUFJO29EQUMxQ2UsV0FBVTs4REFDWDs7Ozs7Ozs7Ozs7O3VDQVpLSTs7Ozs7Z0NBa0JYbEMsVUFBVXVCLE1BQU0sR0FBR3JCLDhCQUNsQiw4REFBQ1Asd0VBQW9CQTtvQ0FBQzJCLG9CQUFvQkE7Ozs7Ozs7Ozs7O2lEQUk5Qyw4REFBQ087OzhDQUNDLDhEQUFDRzs4Q0FBRzs7Ozs7OzhDQUNKLDhEQUFDckMsd0VBQW9CQTtvQ0FBQzJCLG9CQUFvQkE7Ozs7Ozs7Ozs7O2dDQUU3Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS1g7R0E3RlN2QjtLQUFBQTtBQStGVCwrREFBZUEsVUFBVUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvYXBwL1ZlclRhcmpldGEvcGFnZS5qcz83YTRhIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2UgY2xpZW50J1xyXG5cclxuXHJcbmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBCdXR0b25BZ3JlZ2FyVGFyamV0YSBmcm9tICdAL0NvbXBvbmVudHMvQnV0dG9uQWdyZWdhclRhcmpldGEnO1xyXG5pbXBvcnQgQnV0dG9uRWxpbWluYXJUYXJqZXRhIGZyb20gJ0AvQ29tcG9uZW50cy9CdXR0b25FbGltaW5hclRhcmpldGEnO1xyXG5pbXBvcnQgTWVudU51ZXZvIGZyb20gJ0AvQ29tcG9uZW50cy9NZW51TnVldm8nO1xyXG5pbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0ICcuL3RhcmpldGEuY3NzJ1xyXG5mdW5jdGlvbiBWZXJUYXJqZXRhKCkge1xyXG4gIGNvbnN0IFt1c2VyQ2FyZHMsIHNldFVzZXJDYXJkc10gPSB1c2VTdGF0ZShbXSk7XHJcbiAgY29uc3QgbWF4Q2FyZExpbWl0ID0gNTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IHVzZXJJc0xvZ2dlZEluID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ1c2VyTG9nZ2VkSW5cIikgPT09IFwidHJ1ZVwiO1xyXG5cclxuICAgIGlmICh1c2VySXNMb2dnZWRJbikge1xyXG4gICAgICBjb25zdCBhdXRoZW50aWNhdGVkVXNlciA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJjdXJyZW50VXNlclwiKSk7XHJcblxyXG4gICAgICBpZiAoYXV0aGVudGljYXRlZFVzZXIgJiYgYXV0aGVudGljYXRlZFVzZXIuY2FyZHMpIHtcclxuICAgICAgICBzZXRVc2VyQ2FyZHMoYXV0aGVudGljYXRlZFVzZXIuY2FyZHMpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDYXJkRGVsZXRpb24gPSAoY2FyZFR5cGUpID0+IHtcclxuICAgIGNvbnN0IHVwZGF0ZWRVc2VyQ2FyZHMgPSB1c2VyQ2FyZHMuZmlsdGVyKChjYXJkKSA9PiBjYXJkLnR5cGUgIT09IGNhcmRUeXBlKTtcclxuICAgIGNvbnN0IGF1dGhlbnRpY2F0ZWRVc2VyID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImN1cnJlbnRVc2VyXCIpKTtcclxuXHJcbiAgICBpZiAoYXV0aGVudGljYXRlZFVzZXIpIHtcclxuICAgICAgYXV0aGVudGljYXRlZFVzZXIuY2FyZHMgPSB1cGRhdGVkVXNlckNhcmRzO1xyXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImN1cnJlbnRVc2VyXCIsIEpTT04uc3RyaW5naWZ5KGF1dGhlbnRpY2F0ZWRVc2VyKSk7XHJcbiAgICAgIHNldFVzZXJDYXJkcyh1cGRhdGVkVXNlckNhcmRzKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVDYXJkRGV0YWlscyA9IChjYXJkVHlwZSkgPT4ge1xyXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgL0VkaXQtY2FyZD9jYXJkVHlwZT0ke2NhcmRUeXBlfWA7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ2FyZEFkZGl0aW9uID0gKGNhcmRUeXBlKSA9PiB7XHJcbiAgICBpZiAodXNlckNhcmRzLmxlbmd0aCA+PSBtYXhDYXJkTGltaXQpIHtcclxuICAgICAgYWxlcnQoJ05vIHB1ZWRlcyBhZ3JlZ2FyIG3DoXMgZGUgNSB0YXJqZXRhcy4nKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGF1dGhlbnRpY2F0ZWRVc2VyID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImN1cnJlbnRVc2VyXCIpKTtcclxuXHJcbiAgICBpZiAoYXV0aGVudGljYXRlZFVzZXIpIHtcclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYXV0aGVudGljYXRlZFVzZXIuY2FyZHMpKSB7XHJcbiAgICAgICAgYXV0aGVudGljYXRlZFVzZXIuY2FyZHMucHVzaCh7IHR5cGU6IGNhcmRUeXBlLCBkYXRhOiB7fSB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhdXRoZW50aWNhdGVkVXNlci5jYXJkcyA9IFt7IHR5cGU6IGNhcmRUeXBlLCBkYXRhOiB7fSB9XTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJjdXJyZW50VXNlclwiLCBKU09OLnN0cmluZ2lmeShhdXRoZW50aWNhdGVkVXNlcikpO1xyXG4gICAgICBzZXRVc2VyQ2FyZHMoWy4uLnVzZXJDYXJkcywgeyB0eXBlOiBjYXJkVHlwZSwgZGF0YToge30gfV0pO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2PlxyXG4gICAgICA8TWVudU51ZXZvIC8+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiQWdyZWdhclwiPlxyXG4gICAgICAgIDxoMT5UQVJKRVRBUyBSRUdJU1RSQURBUzwvaDE+XHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgIHt1c2VyQ2FyZHMgJiYgdXNlckNhcmRzLmxlbmd0aCA+IDAgPyAoXHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgPGgyPsK/RGVzZWEgZWxpbWluYXIgYWxndW5hIHRhcmpldGEgbyB2ZXIgbcOhcyBkZXRhbGxlcz88L2gyPlxyXG4gICAgICAgICAgICAgIHt1c2VyQ2FyZHMubWFwKChjYXJkLCBpbmRleCkgPT4gKFxyXG4gICAgICAgICAgICAgICAgPGRpdiBrZXk9e2luZGV4fSBjbGFzc05hbWU9XCJjYXJkLW9wdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtaW1hZ2UtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e2AvJHtjYXJkLnR5cGV9LnBuZ2B9IGFsdD17Y2FyZC50eXBlfSBjbGFzc05hbWU9XCJjYXJkLWltYWdlXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVDYXJkRGVsZXRpb24oY2FyZC50eXBlKX1cclxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImNhcmQtYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICBFbGltaW5hclxyXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZUNhcmREZXRhaWxzKGNhcmQudHlwZSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJjYXJkLWJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgVmVyIG3DoXNcclxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgICB7dXNlckNhcmRzLmxlbmd0aCA8IG1heENhcmRMaW1pdCAmJiAoXHJcbiAgICAgICAgICAgICAgICA8QnV0dG9uQWdyZWdhclRhcmpldGEgaGFuZGxlQ2FyZEFkZGl0aW9uPXtoYW5kbGVDYXJkQWRkaXRpb259IC8+XHJcbiAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgIDxoMj7Cv1F1w6kgdGlwbyBkZSB0YXJqZXRhIGRlc2VhIHJlZ2lzdHJhcj88L2gyPlxyXG4gICAgICAgICAgICAgIDxCdXR0b25BZ3JlZ2FyVGFyamV0YSBoYW5kbGVDYXJkQWRkaXRpb249e2hhbmRsZUNhcmRBZGRpdGlvbn0gLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICApfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZlclRhcmpldGE7XHJcbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZUVmZmVjdCIsIkJ1dHRvbkFncmVnYXJUYXJqZXRhIiwiQnV0dG9uRWxpbWluYXJUYXJqZXRhIiwiTWVudU51ZXZvIiwidXNlU3RhdGUiLCJWZXJUYXJqZXRhIiwidXNlckNhcmRzIiwic2V0VXNlckNhcmRzIiwibWF4Q2FyZExpbWl0IiwidXNlcklzTG9nZ2VkSW4iLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiYXV0aGVudGljYXRlZFVzZXIiLCJKU09OIiwicGFyc2UiLCJjYXJkcyIsImhhbmRsZUNhcmREZWxldGlvbiIsImNhcmRUeXBlIiwidXBkYXRlZFVzZXJDYXJkcyIsImZpbHRlciIsImNhcmQiLCJ0eXBlIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsImhhbmRsZUNhcmREZXRhaWxzIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwiaGFuZGxlQ2FyZEFkZGl0aW9uIiwibGVuZ3RoIiwiYWxlcnQiLCJBcnJheSIsImlzQXJyYXkiLCJwdXNoIiwiZGF0YSIsImRpdiIsImNsYXNzTmFtZSIsImgxIiwiaDIiLCJtYXAiLCJpbmRleCIsImltZyIsInNyYyIsImFsdCIsImJ1dHRvbiIsIm9uQ2xpY2siXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-client)/./src/app/VerTarjeta/page.js\n"));

/***/ })

});