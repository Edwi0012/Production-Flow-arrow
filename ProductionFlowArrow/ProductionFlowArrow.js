
// Authors:
// Erik Borenäs || Pontus Myhrberg
// erik.borenas@hotmail.com || pontusmyhrberg96@gmail.com 

// All of the CSS definitions (The styling section and the defineing boxes section)
// in this script can be written in another way. That way is used in the "machine park".


//Main JavaScript
define( ["jquery",
		"underscore",
		"qlik", 
		"angular",
		"core.utils/deferred", 
		'./Properties',
		'./initialproperties',
		'text!./template.html'
],

//The order of the "define" section above should have the same order as the parameters in the function below
function ($, _, qlik, angular, Deferred, props, initProps, ngTemplate) {
	'use strict';
	

	return {
		support : {
			snapshot: true,
			export: true,
			exportData : false,
			
		},
		definition: props,
		initialProperties: initProps,
		template: ngTemplate,
		
		// *****************************************************************************
    	//  Controller
   	 	// *****************************************************************************
		
		controller: ['$scope', function ( $scope) {

		
		// *****************************************************************************
    	//  Styling
   	 	// *****************************************************************************
		$scope.arrow_right = {
			"position": "relative",
			"clip-path": "polygon(0% 35%, 80% 35%, 80% 0%, 100% 50%, 80% 100%, 80% 65%, 0% 65%)",
			"width": "100%",
			"height": "100%",
			"z-index":"3"
		}
			
		$scope.button = {
    		"background-color": "red",
    		"border": "none",
    		"color": "white",
    		"padding": "2%",
			"width": "40%",
			"height": "20%",
    		"text-align": "center",
    		"text-decoration": "none",
			"vertical-align": "middle",
    		"display": "inline-block",
			"font-size": '30px',
			"z-index": "4",
			"top":"40%",
			"left":"10%"
		}
			
		$scope.container ={
			"position": "relative",
 			"height": "100%",
  			"display": "flex",
  			"align-items": "center",
  			"justify-content": "center" 
  		}
			
		$scope.myh = {
			"overflow": "hidden",
			"position": "relative",
			"font-size": "6pt",
			"color": "black",
			"font-style": "italic",
			"top": "50%",
			"transform": "translateY(-50%)",
			"text-align": "center",
		}
			
		$scope.depart = {
			"position": "absolute",
			"top": "50%",
			"left": "50%",
			"width": "100%",
			"height": "100%",
			"border-style": "hidden",
			"color": "black",
			"font-weight": "bold",
			"padding": "0% 0% 0% 0%",
			"text-align": "center",
			"text-decoration": "none",
			"display": "inline-block",
			"font-size": "20pt",
			"z-index": "5",
			"transform": "translate(-50%, -50%)",
			"text-align": "center",
		}
			
		// *****************************************************************************
    	//  functions
   	 	// *****************************************************************************
		
		// Change fontsize of boxes and department
		$scope.fontSizeBoxes = function(){
			$scope.myh.fontSize = $scope.layout.fontSizeBoxes;
		}
		
		$scope.fontSizeDepartment = function(){
			$scope.depart.fontSize = $scope.layout.fontSizeDepartment;
		}
		
		// Function to display the data and the headings in the boxes.
		$scope.dispValues = function (){
			var i = 0;
			var count_upper;
			var tot_meas = $scope.layout.qHyperCube.qSize.qcx;
			var val;
			
			$scope.upperValue = [];
			$scope.lowerValue = [];
			$scope.upperTitle = [];
			$scope.lowerTitle = [];
			
			
			//*******************************************************************************
			//****								UPPER BOXES						  	  *******
			//*******************************************************************************
			for(i = 0; i < $scope.layout.addbox_upper; i++){
				if(i < tot_meas){
					$scope.upperValue.push($scope.layout.qHyperCube.qDataPages[0].qMatrix[0][i].qText);
					$scope.upperTitle.push($scope.layout.qHyperCube.qMeasureInfo[i].qFallbackTitle);
				}				
			}
			count_upper = i;
			
			//*******************************************************************************
			//****								LOWER BOXES						  	  *******
			//*******************************************************************************	
			for(i = count_upper; i < ($scope.layout.addbox_lower + count_upper); i++){
				if(i < tot_meas){
					$scope.lowerValue.push($scope.layout.qHyperCube.qDataPages[0].qMatrix[0][i].qText);
					$scope.lowerTitle.push($scope.layout.qHyperCube.qMeasureInfo[i].qFallbackTitle);
				}				
			}
		}
		
		
		
		
		
		// This part is from the "Sheet navigation and actions"
		$scope.checkQlikNavigation = function() {
                return !!qlik.navigation
        }
		$scope.nextSheet = function() {
                $scope.checkQlikNavigation() && qlik.navigation.nextSheet()
        }
		$scope.prevSheet = function() {
                $scope.checkQlikNavigation() && qlik.navigation.prevSheet()
        }
		$scope.gotoSheet = function(sheetId) {
                $scope.checkQlikNavigation() && !_.isEmpty(sheetId) && qlik.navigation.gotoSheet(sheetId)
        }
		$scope.gotoStory = function(storyId) {
                $scope.checkQlikNavigation() && !_.isEmpty(storyId) && qlik.navigation.gotoStory(storyId)
        }
		
		$scope.doNavigate = function() {
                switch ($scope.layout.props.action) {
                    case "nextSheet":
                        $scope.nextSheet();
                        break;
					case "prevSheet":
                        $scope.prevSheet();
                        break;
					case "gotoSheet":
                        $scope.gotoSheet($scope.layout.props.selectedSheet);
                        break;
					case "gotoSheetById":
                        $scope.gotoSheet($scope.layout.props.sheetId);
                        break;
					case "gotoStory":
                        $scope.gotoStory($scope.layout.props.selectedStory);
                        break;
					case "openWebsite":
                        var url = $scope.layout.props.websiteUrl;
                        _.isEmpty(url) || (url.startsWith("http://") || url.startsWith("https://") ? window.open(url) : window.open("http://" + url))
                }
         }
		 
		 $scope.doNavigateColorArrow = function() {
                switch ($scope.layout.colorOptionsArrow) {
                    case "colorWheel":
						$scope.arrow_right.background = $scope.layout.arrowColorWheel.color;	
                        break;
					case "fx":
						$scope.arrow_right.background = $scope.layout.fxColor;
                        break;
				}
			}
		
		//Choose whether to pick color from colorwheel or write yout own function
		$scope.doNavigateColorDepartment = function() {
                switch ($scope.layout.colorOptionsDepartment) {
                    case "colorWheel":
						$scope.depart.color = $scope.layout.colorWheelDepartment.color;	
                        break;
					case "fx":
						$scope.depart.color = $scope.layout.fxColorDepartment;
                        break;
				}
			}
		$scope.doNavigateColorBoxesFont = function() {
                switch ($scope.layout.colorOptionsBoxesFont) {
                    case "colorWheel":
						$scope.myh.color = $scope.layout.colorWheelBoxesFont.color;	
                        break;
					case "fx":
						$scope.myh.color = $scope.layout.fxColorBoxesFont;
                        break;
				}
			}
		 // This part is from the "Sheet navigation and actions"
		 $scope.doAction = function() {
                if ($scope.layout.props.isActionsBefore)
                    for (var app = qlik.currApp(), fld = null, val = null, softlock = null, i = 1; i <= 2; i++) 
					switch (fld = $scope.layout.props["field" + i], val = $scope.layout.props["value" + i], softlock = $scope.layout.props["softlock" + i], $scope.layout.props["actionBefore" + i]) {
                        case "clearAll":
                            app.clearAll();
                            break;
                        case "lockAll":
                            app.lockAll();
                            break;
                        case "unlockAll":
                            app.unlockAll();
                            break;
                        case "clearField":
                            _.isEmpty(fld) || app.field(fld).clear();
                            break;
                        case "selectAlternative":
                            _.isEmpty(fld) || app.field(fld).selectAlternative(softlock);
                            break;
                        case "selectExcluded":
                            _.isEmpty(fld) || app.field(fld).selectExcluded(softlock);
                            break;
                        case "selectField":
                            _.isEmpty(fld) || _.isEmpty(val) || app.field(fld).selectMatch(val, !1);
                            break;
                        case "selectValues":
                            if (!_.isEmpty(fld) && !_.isEmpty(val)) {
                                var vals = splitToStringNum(val, ";");
                                app.field(fld).selectValues(vals, !1)
                            }
                            break;
                        case "selectandLockField":
                            _.isEmpty(fld) || _.isEmpty(val) || (app.field(fld).selectMatch(val, !0), app.field(fld).lock());
                            break;
                        case "lockField":
                            _.isEmpty(fld) || app.field(fld).lock();
                            break;
                        case "applyBookmark":
                            _.isEmpty($scope.layout.props["bookmark" + i]) || app.bookmark.apply($scope.layout.props["bookmark" + i]);
                            break;
                        case "setVariable":
                            _.isEmpty($scope.layout.props["variable" + i]) || $scope.setVariableContent($scope.layout.props["variable" + i], val)
                    }
            },
		
		// Function to add boxes
		$scope.addBoxes = function(){
			
				var nBoxesUpper = $scope.layout.addbox_upper;
				var nBoxesLower = $scope.layout.addbox_lower;
				var i;
				
				//Initialize box positions behind the arrow
				for(i = 0; i < 4; i++){
					$scope['upper_top' + i] = {"position": "absolute"};
					$scope['upper_bottom' + i] = {"position": "absolute"};
					$scope['lower_top' + i] = {"position": "absolute"};
					$scope['lower_bottom' + i] = {"position": "absolute"};
				}
				
				
		/*********************************************************************************		
		**********************************************************************************
		****								DEFINING BOXES							******
		****																		******
		**********************************************************************************
		*********************************************************************************/
		
		
		/*********************************************************************************
		***									UPPER BOXES								   ***
		*********************************************************************************/
				
				if(nBoxesUpper == 1){

					$scope.upper_top0 = {
						"position": "absolute",
						"background-color": $scope.layout.upperTitle_Box0, 
						"z-index": "2",
						"width": "80%",
						"height": "18%",
						"font-weight": "bold",
						"font-size": "30px",
						"top":"0%",
						"left":"0%",
						"border": "0.02px solid black" 
					}
				
					
					$scope.upper_bottom0 = {
						"position": "absolute",
						"background-color": $scope.layout.upper_Box0, 
						"z-index": "2",
						"width": "80%",
						"height": "17%",
						"font-weight": "bold",
						"font-size": "30px",
						"top":"18%",
						"left":"0%",
						"border": "0.02px solid black" 
					}
				}
				
				else if(nBoxesUpper == 2){
				
					$scope.upper_top0 = {
						"position": "absolute",
						"background-color": $scope.layout.upperTitle_Box0, 
						"z-index": "2",
						"width": "40%",
						"height": "18%",
						"font-weight": "bold",
						"font-size": "30px",
						"top":"0%",
						"left":"0%",
						"border": "0.02px solid black" 
					}
				
					$scope.upper_bottom0 = {
						"position": "absolute",
						"background-color": $scope.layout.upper_Box0, 
						"z-index": "2",
						"width": "40%",
						"height": "17%",
						"font-weight": "bold",
						"font-size": "30px",
						"top":"18%",
						"left":"0%",
						"border": "0.02px solid black" 
					}
					
					$scope.upper_top1 = {
						"position": "absolute",
						"background-color": $scope.layout.upperTitle_Box1,  
						"z-index": "2",
						"width": "40%",
						"height": "18%",
						"font-weight": "bold",
						"font-size": "30px",
						"top":"0%",
						"left":"40%",
						"border": "0.02px solid black" 
					}
				
					$scope.upper_bottom1 = {
						"position": "absolute",
						"background-color":$scope.layout.upper_Box1, 
						"z-index": "2",
						"width": "40%",
						"height": "17%",
						"font-weight": "bold",
						"font-size": "30px",
						"top":"18%",
						"left":"40%",
						"border": "0.02px solid black" 
					}
				}
				
				else if(nBoxesUpper == 3){
					
					$scope.upper_top0 = {
						"position": "absolute",
						"background-color": $scope.layout.upperTitle_Box0,  
						"z-index": "2",
						"width": "26.6%",
						"height": "18%",
						"font-weight": "bold",
						"font-size": "30px",
						"top":"0%",
						"left":"0%",
						"border": "0.02px solid black" 
					}
				
					$scope.upper_bottom0 = {
						"position": "absolute",
						"background-color": $scope.layout.upper_Box0, 
						"z-index": "2",
						"width": "26.6%",
						"height": "17%",
						"font-weight": "bold",
						"font-size": "30px",
						"top":"18%",
						"left":"0%",
						"border": "0.02px solid black" 
					}
					
					$scope.upper_top1 = {
						"position": "absolute",
						"background-color": $scope.layout.upperTitle_Box1,  
						"z-index": "2",
						"width": "26.6%",
						"height": "18%",
						"font-weight": "bold",
						"font-size": "30px",
						"top":"0%",
						"left":"26.6%",
						"border": "0.02px solid black" 
					}

					$scope.upper_bottom1 = {
						"position": "absolute",
						"background-color": $scope.layout.upper_Box1, 
						"z-index": "2",
						"width": "26.6%",
						"height": "17%",
						"font-weight": "bold",
						"font-size": "30px",
						"top":"18%",
						"left":"26.6%",
						"border": "0.02px solid black" 
					}
					
					$scope.upper_top2 = {
						"position": "absolute",
						"background-color": $scope.layout.upperTitle_Box2,  
						"z-index": "2",
						"width": "26.79%",
						"height": "18%",
						"font-weight": "bold",
						"font-size": "30px",
						"top":"0%",
						"left":"53.21%",
						"border": "0.02px solid black" 
					}
				
					$scope.upper_bottom2 = {
						"position": "absolute",
						"background-color": $scope.layout.upper_Box2, 
						"z-index": "2",
						"width": "26.79%",
						"height": "17%",
						"font-weight": "bold",
						"font-size": "30px",
						"top":"18%",
						"left":"53.21%",
						"border": "0.02px solid black" 
					}
				}
				else if(nBoxesUpper == 4){
					
					$scope.upper_top0 = {
						"position": "absolute",
						"background-color": $scope.layout.upperTitle_Box0,  
						"z-index": "2",
						"width": "20%",
						"height": "18%",
						"font-weight": "bold",
						"font-size": "30px",
						"top":"0%",
						"left":"0%",
						"border": "0.02px solid black" 
					}
				
					$scope.upper_bottom0 = {
						"position": "absolute",
						"background-color": $scope.layout.upper_Box0, 
						"z-index": "2",
						"width": "20%",
						"height": "17%",
						"font-weight": "bold",
						"font-size": "30px",
						"top":"18%",
						"left":"0%",
						"border": "0.02px solid black" 
					}
					
					$scope.upper_top1 = {
						"position": "absolute",
						"background-color": $scope.layout.upperTitle_Box1,  
						"z-index": "2",
						"width": "20%",
						"height": "18%",
						"font-weight": "bold",
						"font-size": "30px",
						"top":"0%",
						"left":"20%",
						"border": "0.02px solid black" 
					}
					
					$scope.upper_bottom1 = {
						"position": "absolute",
						"background-color": $scope.layout.upper_Box1, 
						"z-index": "2",
						"width": "20%",
						"height": "17%",
						"font-weight": "bold",
						"font-size": "30px",
						"top":"18%",
						"left":"20%",
						"border": "0.02px solid black" 
					}
					
					$scope.upper_top2 = {
						"position": "absolute",
						"background-color": $scope.layout.upperTitle_Box2, 
						"z-index": "2",
						"width": "20%",
						"height": "18%",
						"font-weight": "bold",
						"font-size": "30px",
						"top":"0%",
						"left":"40%",
						"border": "0.02px solid black" 
					}

					$scope.upper_bottom2 = {
						"position": "absolute",
						"background-color": $scope.layout.upper_Box2, 
						"z-index": "2",
						"width": "20%",
						"height": "17%",
						"font-weight": "bold",
						"font-size": "30px",
						"top":"18%",
						"left":"40%",
						"border": "0.02px solid black" 
					}

					$scope.upper_top3 = {
						"position": "absolute",
						"background-color": $scope.layout.upperTitle_Box3,  
						"z-index": "2",
						"width": "20%",
						"height": "18%",
						"font-weight": "bold",
						"font-size": "30px",
						"top":"0%",
						"left":"60%",
						"border": "0.02px solid black" 
					}

					$scope.upper_bottom3 = {
						"position": "absolute",
						"background-color": $scope.layout.upper_Box3, 
						"z-index": "2",
						"width": "20%",
						"height": "17%",
						"font-weight": "bold",
						"font-size": "30px",
						"top":"18%",
						"left":"60%",
						"border": "0.02px solid black" 
					}

				}
				
				
				
		/*********************************************************************************
		***									LOWER BOXES								   ***
		*********************************************************************************/
				
				
				if(nBoxesLower == 1){

					$scope.lower_top0 = {
						"position": "absolute",
						"background-color": $scope.layout.lowerTitle_Box0,  
						"z-index": "2",
						"width": "80%",
						"height": "18%",
						"font-weight": "bold",
						"font-size": "30px",
						"top":"65%",
						"left":"0%",
						"border": "0.02px solid black" 
					}
				
					
					$scope.lower_bottom0 = {
						"position": "absolute",
						"background-color": $scope.layout.lower_Box0, 
						"z-index": "2",
						"width": "80%",
						"height": "17%",
						"font-weight": "bold",
						"font-size": "30px",
						"top":"83%",
						"left":"0%",
						"border": "0.02px solid black" 
					}
				}
				
				else if(nBoxesLower == 2){
				
					$scope.lower_top0 = {
						"position": "absolute",
						"background-color": $scope.layout.lowerTitle_Box0, 
						"z-index": "2",
						"width": "40%",
						"height": "18%",
						"font-weight": "bold",
						"font-size": "30px",
						"top":"65%",
						"left":"0%",
						"border": "0.02px solid black" 
					}
				
					$scope.lower_bottom0 = {
						"position": "absolute",
						"background-color": $scope.layout.lower_Box0, 
						"z-index": "2",
						"width": "40%",
						"height": "17%",
						"font-weight": "bold",
						"font-size": "30px",
						"top":"83%",
						"left":"0%",
						"border": "0.02px solid black" 
					}
					
					$scope.lower_top1 = {
						"position": "absolute",
						"background-color": $scope.layout.lowerTitle_Box1,  
						"z-index": "2",
						"width": "40%",
						"height": "18%",
						"font-weight": "bold",
						"font-size": "30px",
						"top":"65%",
						"left":"40%",
						"border": "0.02px solid black" 
					}
				
					$scope.lower_bottom1 = {
						"position": "absolute",
						"background-color": $scope.layout.lower_Box1, 
						"z-index": "2",
						"width": "40%",
						"height": "17%",
						"font-weight": "bold",
						"font-size": "30px",
						"top":"83%",
						"left":"40%",
						"border": "0.02px solid black" 
					}
				}
				
				else if(nBoxesLower == 3){
					
					$scope.lower_top0 = {
						"position": "absolute",
						"background-color": $scope.layout.lowerTitle_Box0,  
						"z-index": "2",
						"width": "26.6%",
						"height": "18%",
						"font-weight": "bold",
						"font-size": "30px",
						"top":"65%",
						"left":"0%",
						"border": "0.02px solid black" 
					}
				
					$scope.lower_bottom0 = {
						"position": "absolute",
						"background-color": $scope.layout.lower_Box0, 
						"z-index": "2",
						"width": "26.6%",
						"height": "17%",
						"font-weight": "bold",
						"font-size": "30px",
						"top":"83%",
						"left":"0%",
						"border": "0.02px solid black" 
					}
					
					$scope.lower_top1 = {
						"position": "absolute",
						"background-color": $scope.layout.lowerTitle_Box1,  
						"z-index": "2",
						"width": "26.6%",
						"height": "18%",
						"font-weight": "bold",
						"font-size": "30px",
						"top":"65%",
						"left":"26.6%",
						"border": "0.02px solid black" 
					}

					$scope.lower_bottom1 = {
						"position": "absolute",
						"background-color": $scope.layout.lower_Box1, 
						"z-index": "2",
						"width": "26.6%",
						"height": "17%",
						"font-weight": "bold",
						"font-size": "30px",
						"top":"83%",
						"left":"26.6%",
						"border": "0.02px solid black" 
					}
					
					$scope.lower_top2 = {
						"position": "absolute",
						"background-color": $scope.layout.lowerTitle_Box2,  
						"z-index": "2",
						"width": "26.79%",
						"height": "18%",
						"font-weight": "bold",
						"font-size": "30px",
						"top":"65%",
						"left":"53.21%",
						"border": "0.02px solid black" 
					}
				
					$scope.lower_bottom2 = {
						"position": "absolute",
						"background-color": $scope.layout.lower_Box2, 
						"z-index": "2",
						"width": "26.79%",
						"height": "17%",
						"font-weight": "bold",
						"font-size": "30px",
						"top":"83%",
						"left":"53.21%",
						"border": "0.02px solid black" 
					}
				}
				else if(nBoxesLower == 4){
					
					$scope.lower_top0 = {
						"position": "absolute",
						"background-color": $scope.layout.lowerTitle_Box0,  
						"z-index": "2",
						"width": "20%",
						"height": "18%",
						"font-weight": "bold",
						"font-size": "30px",
						"top":"65%",
						"left":"0%",
						"border": "0.02px solid black" 
					}
				
					$scope.lower_bottom0 = {
						"position": "absolute",
						"background-color": $scope.layout.lower_Box0, 
						"z-index": "2",
						"width": "20%",
						"height": "17%",
						"font-weight": "bold",
						"font-size": "30px",
						"top":"83%",
						"left":"0%",
						"border": "0.02px solid black" 
					}
					
					$scope.lower_top1 = {
						"position": "absolute",
						"background-color": $scope.layout.lowerTitle_Box1,  
						"z-index": "2",
						"width": "20%",
						"height": "18%",
						"font-weight": "bold",
						"font-size": "30px",
						"top":"65%",
						"left":"20%",
						"border": "0.02px solid black" 
					}
					
					$scope.lower_bottom1 = {
						"position": "absolute",
						"background-color": $scope.layout.lower_Box1, 
						"z-index": "2",
						"width": "20%",
						"height": "17%",
						"font-weight": "bold",
						"font-size": "30px",
						"top":"83%",
						"left":"20%",
						"border": "0.02px solid black" 
					}
					
					$scope.lower_top2 = {
						"position": "absolute",
						"background-color": $scope.layout.lowerTitle_Box2,  
						"z-index": "2",
						"width": "20%",
						"height": "18%",
						"font-weight": "bold",
						"font-size": "30px",
						"top":"65%",
						"left":"40%",
						"border": "0.02px solid black" 
					}

					$scope.lower_bottom2 = {
						"position": "absolute",
						"background-color": $scope.layout.lower_Box2, 
						"z-index": "2",
						"width": "20%",
						"height": "17%",
						"font-weight": "bold",
						"font-size": "30px",
						"top":"83%",
						"left":"40%",
						"border": "0.02px solid black" 
					}

					$scope.lower_top3 = {
						"position": "absolute",
						"background-color": $scope.layout.lowerTitle_Box3, 
						"z-index": "2",
						"width": "20%",
						"height": "18%",
						"font-weight": "bold",
						"font-size": "30px",
						"top":"65%",
						"left":"60%",
						"border": "0.02px solid black" 
					}

					$scope.lower_bottom3 = {
						"position": "absolute",
						"background-color": $scope.layout.lower_Box3, 
						"z-index": "2",
						"width": "20%",
						"height": "17%",
						"font-weight": "bold",
						"font-size": "30px",
						"top":"83%",
						"left":"60%",
						"border": "0.02px solid black" 
					}
				}
			}
		}]
	};
});
	
			
			