// Properties
define( ["jquery", "underscore", "qlik", "ng!$q", "ng!$http"], function ($, _, qlik, $q, $http) {
    'use strict';
	
	// *****************************************************************************
    //  Functions
    // *****************************************************************************
	var app = qlik.currApp(),
	 getSheetList = function() {
            var defer = $q.defer();
            return app.getAppObjectList(function(data) {
                var sheets = [],
                    sortedData = _.sortBy(data.qAppObjectList.qItems, function(item) {
                        return item.qData.rank
                    });
                return _.each(sortedData, function(item) {
                    sheets.push({
                        value: item.qInfo.qId,
                        label: item.qMeta.title
                    })
                }), defer.resolve(sheets)
            }), defer.promise
        },
	
	getStoryList = function() {
            var defer = $q.defer();
            return app.getList("story", function(data) {
                var stories = [];
                return data && data.qAppObjectList && data.qAppObjectList.qItems && data.qAppObjectList.qItems.forEach(function(item) {
                    stories.push({
                        value: item.qInfo.qId,
                        label: item.qMeta.title
                    })
                }), defer.resolve(_.sortBy(stories, function(item) {
                    return item.label
                }))
            }), defer.promise
        };
	// *****************************************************************************
    //  Dimensions
    // *****************************************************************************
    //var dimensions = {uses: "dimensions"}; Do we want this?
		
	// *****************************************************************************
    //  Measures
    // *****************************************************************************
	
    var measures = { 
		uses: "measures",
		min: 0,
		max: 8
	};
	
	// *****************************************************************************
    //  Department-section
    // *****************************************************************************
	
	var thedepartment ={
		ref: "thedepartment",
		label: "Department",
		type: "string",
		expression: "optional",
		defaultValue:"DEPARTMENT"
	};
	
	var department = {
		component: "expandable-items",
		label: "Department",
		items: {
			thedepartment: thedepartment
		}
	};
	
	// *****************************************************************************
    //  Box-section
    // *****************************************************************************
	
	
	var addBoxUpper ={
		label:"Give Number Of Upper Boxes",
		ref: "addbox_upper",
		type: "number",
		defaultValue: "0",
		expression: "optional" //Makes it possible to add f(x) in input box
	};
	
	var addBoxLower ={
		label:"Give Number Of Lower Boxes",
		ref: "addbox_lower",
		type: "number",
		defaultValue: "0",
		expression: "optional" //Makes it possible to add f(x) in input box
	};
	
	var upperTitleBox0 = {
		ref: "upperTitle_Box0",
		label: "Color Title Box 1 Upper",
		type: "string",
		expression: "optional", //Makes it possible to add f(x) in input box
		defaultValue:'#a6a6a6',
		show: function(data) {
                return 0 < data.addbox_upper
        }
	};
	
	
	var upperTitleBox1 = {
		ref: "upperTitle_Box1",
		label: "Color Title Box 2 Upper",
		type: "string",
		expression: "optional",
		defaultValue:'#a6a6a6',
		show: function(data) {
                return 1 < data.addbox_upper
        }
	};
	
	
	var upperTitleBox2 = {
		ref: "upperTitle_Box2",
		label: "Color Title Box 3 Upper",
		type: "string",
		expression: "optional", //Makes it possible to add f(x) in input box
		defaultValue:'#a6a6a6',
		show: function(data) {
                return 2 < data.addbox_upper
        }
	};
	
	
	var upperTitleBox3 = {
		ref: "upperTitle_Box3",
		label: "Color Title Box 4 Upper",
		type: "string",
		expression: "optional",
		defaultValue:'#a6a6a6',
		show: function(data) {
                return 3 < data.addbox_upper
        }
	};
	
	var upperBox0 = {
		ref: "upper_Box0",
		label: "Color Box 1 Upper",
		type: "string",
		expression: "optional", //Makes it possible to add f(x) in input box
		defaultValue:'#00cc00',
		show: function(data) {
                return 0 < data.addbox_upper
        }
	};
	
	
	var upperBox1 = {
		ref: "upper_Box1",
		label: "Color Box 2 Upper",
		type: "string",
		expression: "optional",
		defaultValue:'#00cc00',
		show: function(data) {
                return 1 < data.addbox_upper
        }
	};
	
	
	var upperBox2 = {
		ref: "upper_Box2",
		label: "Color Box 3 Upper",
		type: "string",
		expression: "optional", //Makes it possible to add f(x) in input box
		defaultValue:'#00cc00',
		show: function(data) {
                return 2 < data.addbox_upper
        }
	};
	
	
	var upperBox3 = {
		ref: "upper_Box3",
		label: "Color Box 4 Upper",
		type: "string",
		expression: "optional",
		defaultValue:'#00cc00',
		show: function(data) {
                return 3 < data.addbox_upper
        }
	};
	
	
	
	var lowerTitleBox0 = {
		ref: "lowerTitle_Box0",
		label: "Color Title Box 1 Lower",
		type: "string",
		expression: "optional", //Makes it possible to add f(x) in input box
		defaultValue:'#a6a6a6',
		show: function(data) {
                return 0 < data.addbox_lower
        }
	};
	
	
	var lowerTitleBox1 = {
		ref: "lowerTitle_Box1",
		label: "Color Title Box 2 Lower",
		type: "string",
		expression: "optional",
		defaultValue:'#a6a6a6',
		show: function(data) {
                return 1 < data.addbox_lower
        }
	};
	
	
	var lowerTitleBox2 = {
		ref: "lowerTitle_Box2",
		label: "Color Title Box 3 Lower",
		type: "string",
		expression: "optional", //Makes it possible to add f(x) in input box
		defaultValue:'#a6a6a6',
		show: function(data) {
                return 2 < data.addbox_lower
        }
	};
	
	
	var lowerTitleBox3 = {
		ref: "lowerTitle_Box3",
		label: "Color Title Box 4 Lower",
		type: "string",
		expression: "optional",
		defaultValue:'#a6a6a6',
		show: function(data) {
                return 3 < data.addbox_lower
        }
	};
	
	var lowerBox0 = {
		ref: "lower_Box0",
		label: "Color Box 1 Lower",
		type: "string",
		expression: "optional", //Makes it possible to add f(x) in input box
		defaultValue:'#00cc00',
		show: function(data) {
                return 0 < data.addbox_lower
        }
	};
	
	
	var lowerBox1 = {
		ref: "lower_Box1",
		label: "Color Box 2 Lower",
		type: "string",
		expression: "optional",
		defaultValue:'#00cc00',
		show: function(data) {
                return 1 < data.addbox_lower
        }
	};
	
	
	var lowerBox2 = {
		ref: "lower_Box2",
		label: "Color Box 3 Lower",
		type: "string",
		expression: "optional", //Makes it possible to add f(x) in input box
		defaultValue:'#00cc00',
		show: function(data) {
                return 2 < data.addbox_lower
        }
	};
	
	
	var lowerBox3 = {
		ref: "lower_Box3",
		label: "Color Box 4 Lower",
		type: "string",
		expression: "optional",
		defaultValue:'#00cc00',
		show: function(data) {
                return 3 < data.addbox_lower
        }
	};
	
	var boxes = {
		component: "expandable-items",
		label: "Boxes",
    	items: {
			box:{
				type:"items",
				label:"Boxes",
            		items: {
						addBoxUpper: addBoxUpper,
						upperTitleBox0:upperTitleBox0,
						upperTitleBox1:upperTitleBox1,
						upperTitleBox2:upperTitleBox2,
						upperTitleBox3:upperTitleBox3,
						upperBox0:upperBox0,
						upperBox1:upperBox1,
						upperBox2:upperBox2,
						upperBox3:upperBox3,
						addBoxLower: addBoxLower,
						lowerTitleBox0:lowerTitleBox0,
						lowerTitleBox1:lowerTitleBox1,
						lowerTitleBox2:lowerTitleBox2,
						lowerTitleBox3:lowerTitleBox3,
						lowerBox0:lowerBox0,
						lowerBox1:lowerBox1,
						lowerBox2:lowerBox2,
						lowerBox3:lowerBox3,
        				}
			},
		}
	};
		

		
	// *****************************************************************************
    //  Styling-section
    // *****************************************************************************
	
	// *****************************************************************************
    //  Styling arrow
    // *****************************************************************************
	
	var colorOptionsArrow = {
		ref: "colorOptionsArrow",
            label: "Color Options",
            type: "string",
            component: "dropdown",
            default: "fx",
            options: [{
			    value: "fx",
                label: "Input Color fx"
            }, {
                value: "colorWheel",
                label: "Color Wheel"
            }]
        };
		
	var	fxColor = {
           ref: "fxColor",
           label: "Give Color",
           type: "string",
           expression: "optional",
		   defaultValue:"#fff200",
           show: function(data) {
               return "fx" === data.colorOptionsArrow
           }
        };
	
	var arrowColorWheel = {  
		label: "Color Wheel Arrow",  
		component: "color-picker",  
		ref: "arrowColorWheel",  
		type: "object",
		defaultValue: {  
			//index: 3,  
			color: "#fff200"  
		} , 
		show: function(data) {
               return "colorWheel" === data.colorOptionsArrow
           }
	};
	
	
	// *****************************************************************************
    //  Arrow navigation
    // *****************************************************************************
	
	var buttonNavigation = {
		ref: "props.action",
            label: "Navigation Action",
            type: "string",
            component: "dropdown",
            default: "nextSheet",
            options: [{
                value: "none",
                label: "None"
            }, {
                value: "nextSheet",
                label: "Go to next sheet"
            }, {
                value: "prevSheet",
                label: "Go to previous sheet"
            }, {
                value: "gotoSheet",
                label: "Go to a specific sheet"
            }, {
                value: "gotoSheetById",
                label: "Go to a sheet (defined by Sheet Id)"
            }, {
                value: "gotoStory",
                label: "Go to a story"
            }, {
                value: "openWebsite",
                label: "Open website"
            }]
        };
	
	var	sheetList = {
            type: "string",
            component: "dropdown",
            label: "Select Sheet",
            ref: "props.selectedSheet",
            options: function() {
                return getSheetList().then(function(items) {
                    return items
                })
            },
            show: function(data) {
                return "gotoSheet" === data.props.action
            }
        };
	
	var sheetId = {
           ref: "props.sheetId",
           label: "Sheet ID",
           type: "string",
           expression: "optional",
           show: function(data) {
               return "gotoSheetById" === data.props.action
           }
        };
	
	var	storyList = {
            type: "string",
            component: "dropdown",
            label: "Select Story",
            ref: "props.selectedStory",
            options: function() {
                return getStoryList().then(function(items) {
                    return items
                })
            },
            show: function(data) {
                return "gotoStory" === data.props.action
            }
        };
	
	var websiteUrl = {
            ref: "props.websiteUrl",
            label: "Website Url:",
            type: "string",
            expression: "optional",
            show: function(data) {
                return "openWebsite" === data.props.action
            }
        };
	
	var	isActionsBefore = {
            type: "boolean",
            component: "switch",
            label: "Actions Before Navigating",
            ref: "props.isActionsBefore",
            defaultValue: !1,
            options: [{
                value: !0,
                label: "Enabled"
            }, {
                value: !1,
                label: "Disabled"
            }]
        };
  	
	var actionOptions = [{
            value: "none",
            label: "None"
        }, {
            value: "applyBookmark",
            label: "Apply Bookmark"
        }, {
            value: "clearAll",
            label: "Clear All Selections"
        }, {
            value: "clearField",
            label: "Clear Selection in Field"
        }, {
            value: "lockField",
            label: "Lock Field"
        }, {
            value: "selectExcluded",
            label: "Select Excluded Values"
        }, {
            value: "selectAlternative",
            label: "Select Alternative Values"
        }, {
            value: "selectandLockField",
            label: "Select and Lock in Field"
        }, {
            value: "selectField",
            label: "Select Value in Field"
        }, {
            value: "selectValues",
            label: "Select Multiple Values in Field"
        }, {
            value: "setVariable",
            label: "Set Variable Value"
        }, {
            value: "lockAll",
            label: "Lock All Selections"
        }, {
            value: "unlockAll",
            label: "Unlock All Selections"
        }];
		
	var actionBefore1 = {
            type: "string",
            component: "dropdown",
            label: "First Action",
            ref: "props.actionBefore1",
            defaultValue: "none",
            show: function(data) {
                return data.props.isActionsBefore
            },
            options: actionOptions
        };
		
    var actionBefore2 = {
            type: "string",
            component: "dropdown",
            label: "Second Action",
            ref: "props.actionBefore2",
            defaultValue: "none",
            show: function(data) {
                return data.props.isActionsBefore && "none" !== data.props.actionBefore1
            },
            options: actionOptions
        };
		
	var fieldEnabler = ["selectField", "selectValues", "clearField", "selectandLockField", "lockField", "selectAlternative", "selectExcluded"];
    
	var field1 = {
            type: "string",
            ref: "props.field1",
            label: "Field",
            expression: "optional",
            show: function(data) {
                return fieldEnabler.indexOf(data.props.actionBefore1) > -1
            }
        };
       
	var field2 = {
           type: "string",
           ref: "props.field2",
           label: "Field",
           expression: "optional",
           show: function(data) {
               return fieldEnabler.indexOf(data.props.actionBefore2) > -1
           }
        };
		
	var	bookmarkEnabler = ["applyBookmark"];
	
    var bookmark1 = {
           type: "string",
           ref: "props.bookmark1",
           label: "Bookmark Id",
           expression: "optional",
           show: function(data) {
               return bookmarkEnabler.indexOf(data.props.actionBefore1) > -1
           }
       };
      
	var bookmark2 = {
           type: "string",
           ref: "props.bookmark2",
           label: "Bookmark Id",
           expression: "optional",
           show: function(data) {
               return bookmarkEnabler.indexOf(data.props.actionBefore2) > -1
           }
       };
		 
	var variableEnabler = ["setVariable"];
        
	var variable1 = {
           type: "string",
           ref: "props.variable1",
           label: "Variable Name",
           expression: "optional",
           show: function(data) {
               return variableEnabler.indexOf(data.props.actionBefore1) > -1
           }
       };
       
	var variable2 = {
          type: "string",
          ref: "props.variable2",
          label: "Variable Name",
          expression: "optional",
          show: function(data) {
              return variableEnabler.indexOf(data.props.actionBefore2) > -1
          }
      };
	
	var	valueEnabler = ["selectField", "selectValues", "setVariable", "selectandLockField"];
       
	var value1 = {
          type: "string",
          ref: "props.value1",
          label: "Value",
          expression: "optional",
          show: function(data) {
              return valueEnabler.indexOf(data.props.actionBefore1) > -1
          }
      };
       
	var value2 = {
          type: "string",
          ref: "props.value2",
          label: "Value",
          expression: "optional",
          show: function(data) {
              return valueEnabler.indexOf(data.props.actionBefore2) > -1
          }
      };
       
	var valueDescEnabler = ["selectValues"];
       
	var value1Desc = {
          type: "text",
          component: "text",
          ref: "props.value1Desc",
          label: "Define multiple values separated with a semi-colon (;).",
          show: function(data) {
              return valueDescEnabler.indexOf(data.props.actionBefore1) > -1
          }
      };
     
	var value2Desc = {
          type: "string",
          component: "text",
          ref: "props.value2Desc",
          label: "Define multiple values separated with a semi-colon (;).",
          show: function(data) {
              return valueDescEnabler.indexOf(data.props.actionBefore2) > -1
          }
      };
       
	var bookmark1Enabler = ["applyBookmark"];
       
	var bookmark1 = {
          type: "string",
          component: "dropdown",
          label: "Select Bookmark",
          ref: "props.bookmark1",
          options: function() {
              return getBookmarkList().then(function(items) {
                    return items
              })
          },
          show: function(data) {
              return bookmark1Enabler.indexOf(data.props.actionBefore1) > -1
          }
      };
	  
    var softLockEnabler = ["selectAlternative", "selectExcluded"];
       
	var softlock1 = {
          type: "boolean",
          label: "Soft Lock",
          ref: "props.softlock1",
          defaultValue: !1,
          show: function(data) {
              return softLockEnabler.indexOf(data.props.actionBefore1) > -1
          }
      };
       
	var softlock2 = {
          type: "boolean",
          label: "Soft Lock",
          ref: "props.softlock2",
          defaultValue: !1,
          show: function(data) {
              return softLockEnabler.indexOf(data.props.actionBefore2) > -1
          }
      };
	
	// *****************************************************************************
    //  Font styling
    // *****************************************************************************
	
	var colorOptionsDepartment = {
		ref: "colorOptionsDepartment",
            label: "Color Options Department",
            type: "string",
            component: "dropdown",
            default: "fx",
            options: [{
			    value: "fx",
                label: "Input Color fx"
            }, {
                value: "colorWheel",
                label: "Color Wheel"
            }]
        };
		
	var colorWheelDepartment = {
		label: "Set Font Color Department",  
		component: "color-picker",  
		ref: "colorWheelDepartment",  
		type: "object",  
		defaultValue: {  
			//index: 3,  
			color: "#000000"  
		},
		show: function(data) {
               return "colorWheel" === data.colorOptionsDepartment
           }
	};
	
	var	fxColorDepartment = {
           ref: "fxColorDepartment",
           label: "Give Color",
           type: "string",
           expression: "optional",
		   defaultValue:"#000000",
           show: function(data) {
               return "fx" === data.colorOptionsDepartment
           }
        };
		
	
	var colorOptionsBoxesFont = {
		ref: "colorOptionsBoxesFont",
            label: "Font Color Options Boxes",
            type: "string",
            component: "dropdown",
            default: "fx",
            options: [{
			    value: "fx",
                label: "Input Color fx"
            }, {
                value: "colorWheel",
                label: "Color Wheel"
            }]
        };
		
	var colorWheelBoxesFont = {
		label: "Set Font Color Boxes",  
		component: "color-picker",  
		ref: "colorWheelBoxesFont",  
		type: "object",  
		defaultValue: {  
			//index: 3,  
			color: "#000000"  
		},
		show: function(data) {
               return "colorWheel" === data.colorOptionsBoxesFont
           }
	};
	
	var	fxColorBoxesFont = {
           ref: "fxColorBoxesFont",
           label: "Give Color",
           type: "string",
           expression: "optional",
		   defaultValue:"#000000",
           show: function(data) {
               return "fx" === data.colorOptionsBoxesFont
           }
        };
	
	var fontSizeDepartment = {
		ref: "fontSizeDepartment",
		label: "Font Size Department",
		type: "string",
		defaultValue: "10pt",
		expression: "optional"
	};
	
	// *****************************************************************************
    //  Boxes font
    // *****************************************************************************
	
	var fontSizeBoxes = {
		ref: "fontSizeBoxes",
		label: "Font Size Boxes",
		type: "string",
		defaultValue: "6pt",
		expression: "optional"
	};
	
	// *****************************************************************************
    //  composition of sections
    // *****************************************************************************
	var arrowSection = {
		component: "expandable-items",
		label: "Styling",
    	items: {
			arrow:{
				type:"items",
				label:"Arrow",
            		items: {
						colorOptionsArrow:colorOptionsArrow,
						fxColor:fxColor,
						arrowColorWheel:arrowColorWheel
        			}
			},
			button:{
				type:"items",
				label:"Button",
            	items: {
					buttonNavigation:buttonNavigation,
					sheetList:sheetList,
					sheetId:sheetId,
					storyList:storyList,
					websiteUrl:websiteUrl,
					isActionsBefore: isActionsBefore,
                    actionBefore1: actionBefore1,
                    field1: field1,
                    variable1: variable1,
                    value1: value1,
                    value1Desc: value1Desc,
                    bookmark1: bookmark1,
                    softlock1: softlock1,
                    actionBefore2: actionBefore2,
                    field2: field2,
                    variable2: variable2,
                    value2: value2,
                    value2Desc: value2Desc,
                    bookmark2: bookmark2,
                    softlock2: softlock2
				}
			},
			font:{
			type:"items",
				label:"Font",
            	items: {
					colorOptionsDepartment:colorOptionsDepartment,
					colorWheelDepartment: colorWheelDepartment,
					fxColorDepartment:fxColorDepartment,
					fontSizeDepartment:fontSizeDepartment,
					colorOptionsBoxesFont:colorOptionsBoxesFont,
					colorWheelBoxesFont:colorWheelBoxesFont,
					fxColorBoxesFont: fxColorBoxesFont,
				}
			},
			boxStyle:{
			type:"items",
				label:"Style Boxes",
            	items: {
					fontSizeBoxes: fontSizeBoxes,
				}
			}
		}
		};
		
	// *****************************************************************************
    //  Apperancepanel
    // *****************************************************************************
    var appearancePanel = { uses: "settings" };
    return {
        type: "items",
        component: "accordion",
        items: {
            //dimensions: dimensions,
            measures: measures,
			department: department,
			Boxes: boxes,
			customSection: arrowSection,
            appearance: appearancePanel,
        }
    };
} );