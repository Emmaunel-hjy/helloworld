/*
*  名称：日历控件
*  例子：
*  第一参数说明：
*  createType：日历控件类型：singel-单日历，double-双日历
*  otherShowCtrl：其他触发日历控件显示的jquery对象
*  otherDays：非当月的日期：0-不显示，1-显示可选择(默认)，2-显示不可以选择
*  yesterdays：本月当天以前的日期：0-不显示，1-显示可选择(默认)，2-显示不可选择
*  canClearDate：是否显示“清空日期”功能的按钮。true-显示，false-隐藏
*  startDateObj：前一个日期文本框的jquery对象
*  dayLong：显示日期天数
*  align：显示对齐位置：left-左对齐，right-右对齐，默认：left
*  第二参数说明：
*  fn：控件隐藏后执行的方法
*/
(function($) {

    function jCalender(textBoxId, opts, fn) {
        // 显示日期文本框ID
        this.textBoxId = textBoxId;
        // 传入的参数
        this.opts = opts;
        // 控件隐藏后执行的方法
        this.hideFun = fn;
        // 日历主层ID，控制显示/隐藏，保存控件值
        this.divBoxId = this.textBoxId + "_jCalender_" + opts.createType;
        // 日历控件左侧"年"对应的文本框ID
        this.left_year_Id = this.divBoxId + "_left_year";
        // 日历控件左侧"月"对应的文本框ID
        this.left_month_Id = this.divBoxId + "_left_month";
        // 日历控件右侧"年"对应的文本框ID
        this.right_year_Id = this.divBoxId + "_right_year";
        // 日历控件右侧"月"对应的文本框ID
        this.right_month_Id = this.divBoxId + "_right_month";
        // 选择年
        this.year_pop_Id = this.divBoxId + "_year_pop";
        // 选择月
        this.month_pop_Id = this.divBoxId + "_month_pop";
    }


    jCalender.prototype = {
        // 创建单日历主体
        createSingleCalender: function() {
            var _this = this;
            var divBox = $("<div id=\"" + this.divBoxId + "\" class=\"_jCalender_global_single\" style=\"display:none\"></div>");
            var divBox_table = $("<table class=\"_jCalender_table\" cellpadding=\"0\" cellspacing=\"0\"></table>");
            // 添加标题行
            var titleTr = $("<tr class=\"_jCalender_title\"></tr>");
            $("<td class=\"_jCalender_title_left\" title=\"上个月\"></td>").click(function() {
                _this.lastMonth()
            }).appendTo(titleTr);
            $("<td colspan=\"2\"><input type=\"text\" id=\"" + this.left_year_Id + "\" class=\"_jCalender_title_text_default\" value=\"2014\" readonly=\"readonly\" style=\"width:60px\"/></td>").hover(function() {
                _this.yearShow(_this.left_year_Id, _this.left_month_Id)
            }, function() {
                $("#" + _this.year_pop_Id).stop(true, true).css("display", "none")
            }).appendTo(titleTr);
            $("<td>年</td>").appendTo(titleTr);
            $("<td><input type=\"text\" id=\"" + this.left_month_Id + "\" class=\"_jCalender_title_text_default\" value=\"01\" readonly=\"readonly\" style=\"width:30px\"/></td>").hover(function() {
                _this.monthShow(_this.left_year_Id, _this.left_month_Id)
            }, function() {
                $("#" + _this.month_pop_Id).stop(true, true).css("display", "none")
            }).appendTo(titleTr);
            $("<td>月</td>").appendTo(titleTr);
            $("<td class=\"_jCalender_title_right\" title=\"下个月\"></td>").click(function() {
                _this.nextMonth()
            }).appendTo(titleTr);
            divBox_table.append(titleTr);
            // 添加星期行
            divBox_table.append("<tr class=\"_jCalender_header\"><td class=\"_jCalender_border_left\">一</td><td>二</td><td>三</td><td>四</td><td>五</td><td>六</td><td class=\"_jCalender_border_right\">日</td></tr>");
            // 添加日历主体，共6行7列
            for (var i = 1; i <= 6; i++) {
                var mainTr = $("<tr></tr>");
                mainTr.append("<td id=\"" + this.divBoxId + i + "1\" class=\"_jCalender_content_main\"></td>");
                mainTr.append("<td id=\"" + this.divBoxId + i + "2\" class=\"_jCalender_content_main\"></td>");
                mainTr.append("<td id=\"" + this.divBoxId + i + "3\" class=\"_jCalender_content_main\"></td>");
                mainTr.append("<td id=\"" + this.divBoxId + i + "4\" class=\"_jCalender_content_main\"></td>");
                mainTr.append("<td id=\"" + this.divBoxId + i + "5\" class=\"_jCalender_content_main\"></td>");
                mainTr.append("<td id=\"" + this.divBoxId + i + "6\" class=\"_jCalender_content_main\"></td>");
                mainTr.append("<td id=\"" + this.divBoxId + i + "7\" class=\"_jCalender_content_main\"></td>");
                divBox_table.append(mainTr);
            };

            // 添加底部工具条
            var bottomToolTr = $("<tr class=\"_jCalender_bottom_tool\"></tr>");
            var bottomTool_left_Td = $("<td class=\"_jCalender_border_left\" colspan=\"3\"></td>");
            if (this.opts.canClearDate === true) {
                $("<a href=\"javascript:void(0);\">清空日期</a>").click(function() {
                    _this.clearDate();
                }).appendTo(bottomTool_left_Td);
            } else {
                bottomTool_left_Td.append("");
            }
            bottomToolTr.append(bottomTool_left_Td);
            var bottomTool_right_Td = $("<td class=\"_jCalender_border_right\" colspan=\"4\"></td>");
            $("<a href=\"javascript:void(0);\">今天</a>").click(function() {
                _this.showToday();
            }).appendTo(bottomTool_right_Td);
            bottomTool_right_Td.append("&nbsp;&nbsp;&nbsp;");
            $("<a href=\"javascript:void(0);\">关闭</a>").click(function() {
                _this.dispose();
            }).appendTo(bottomTool_right_Td);
            bottomToolTr.append(bottomTool_right_Td);
            divBox_table.append(bottomToolTr);

            // 添加日历底部
            divBox_table.append("<tr class=\"_jCalender_bottom_foot\"><td class=\"_jCalender_bottom_foot_left\"></td><td class=\"_jCalender_bottom_foot_middle\" colspan=\"5\"></td><td class=\"_jCalender_bottom_foot_right\"></td></tr>");
            divBox.append(divBox_table);

            // 判断IE浏览器
            var isIE = (document.all) ? true : false;
            var isIE6 = isIE && /msie 6/.test(navigator.userAgent.toLowerCase());
            if (isIE6 === true)
                divBox.append("<iframe style='position: absolute;z-index:-1;left: 0; top: 0; width: 100%; height: 100%; border: 0 none Gray; filter: alpha(opacity=0);opacity:0;'></iframe>");

            // 追加年选择
            var yearPop = $("<table id=\"" + this.year_pop_Id + "\" class=\"_jCalender_global_yearPop\" cellpadding=\"0\" cellspacing=\"0\"></table>");
            yearPop.hover(function() {
                $(this).css("display", "block");
            }, function() {
                $(this).stop(true, true);
                $(this).slideUp(100);
            });
            var yearPopLastGroup = $("<td></td>");
            yearPopLastGroup.click(function() {
                _this.yearLastGroup();
            });
            $("<tr class=\"_jCalender_global_yearPop_top\"></tr>").append(yearPopLastGroup).appendTo(yearPop);
            for (var i = 1; i <= 5; i++) {
                $("<tr></tr>").append("<td id=\"" + this.year_pop_Id + "_" + i + "\" class=\"_jCalender_global_yearPop_normal\">2009</td>").appendTo(yearPop);
            };
            var yearPopNextGroup = $("<td></td>");
            yearPopNextGroup.click(function() {
                _this.yearNextGroup();
            });
            $("<tr class=\"_jCalender_global_yearPop_bottom\"></tr>").append(yearPopNextGroup).appendTo(yearPop);
            divBox.append(yearPop);

            // 追加月选择
            var monthPop = $("<table id=\"" + this.month_pop_Id + "\" class=\"_jCalender_global_monthPop\" cellpadding=\"0\" cellspacing=\"0\"></table>");
            monthPop.hover(function() {
                $(this).css("display", "block");
            }, function() {
                $(this).stop(true, true);
                $(this).slideUp(100);
            });
            for (var i = 0; i < 6; i++) {
                $("<tr></tr>").append("<td id=\"" + this.month_pop_Id + "_" + (2 * i + 1) + "\" class=\"_jCalender_global_monthPop_normal\">" + (2 * i + 1) + "</td>").append("<td id=\"" + this.month_pop_Id + "_" + (2 * i + 2) + "\" class=\"_jCalender_global_monthPop_normal\">" + (2 * i + 2) + "</td>").appendTo(monthPop);
            }
            divBox.append(monthPop);

            return divBox;
        },

        // 创建双日历主体
        createDoubleCalender: function() {
            var _this = this;
            var divBox = $("<div id=\"" + this.divBoxId + "\" class=\"_jCalender_global_double\" style=\"display:none\"></div>");
            var divBox_table = $("<table class=\"_jCalender_table\" cellpadding=\"0\" cellspacing=\"0\"></table>");
            // 添加标题行
            var titleTr = $("<tr class=\"_jCalender_title\"></tr>");
            $("<td class=\"_jCalender_title_left\" title=\"上个月\"></td>").click(function() {
                _this.lastMonth()
            }).appendTo(titleTr);
            $("<td colspan=\"2\"><input type=\"text\" id=\"" + this.left_year_Id + "\" class=\"_jCalender_title_text_default\" value=\"2014\" readonly=\"readonly\" style=\"width:60px\"/></td>").hover(function() {
                _this.yearShow(_this.left_year_Id, _this.left_month_Id)
            }, function() {
                $("#" + _this.year_pop_Id).stop(true, true).css("display", "none")
            }).appendTo(titleTr);
            $("<td>年</td>").appendTo(titleTr);
            $("<td><input type=\"text\" id=\"" + this.left_month_Id + "\" class=\"_jCalender_title_text_default\" value=\"01\" readonly=\"readonly\" style=\"width:30px\"/></td>").hover(function() {
                _this.monthShow(_this.left_year_Id, _this.left_month_Id)
            }, function() {
                $("#" + _this.month_pop_Id).stop(true, true).css("display", "none")
            }).appendTo(titleTr);
            $("<td>月</td>").appendTo(titleTr);
            $("<td></td>").appendTo(titleTr);
            $("<td></td>").appendTo(titleTr);
            $("<td colspan=\"2\"><input type=\"text\" id=\"" + this.right_year_Id + "\" class=\"_jCalender_title_text_default\" value=\"2014\" readonly=\"readonly\" style=\"width:60px\"/></td>").hover(function() {
                _this.yearShow(_this.right_year_Id, _this.right_month_Id)
            }, function() {
                $("#" + _this.year_pop_Id).stop(true, true).css("display", "none")
            }).appendTo(titleTr);
            $("<td>年</td>").appendTo(titleTr);
            $("<td><input type=\"text\" id=\"" + this.right_month_Id + "\" class=\"_jCalender_title_text_default\" value=\"01\" readonly=\"readonly\" style=\"width:30px\"/></td>").hover(function() {
                _this.monthShow(_this.right_year_Id, _this.right_month_Id)
            }, function() {
                $("#" + _this.month_pop_Id).stop(true, true).css("display", "none")
            }).appendTo(titleTr);
            $("<td>月</td>").appendTo(titleTr);
            $("<td class=\"_jCalender_title_right\" title=\"下个月\"></td>").click(function() {
                _this.nextMonth()
            }).appendTo(titleTr);
            divBox_table.append(titleTr);
            // 添加星期行
            $("<tr class=\"_jCalender_header\"></tr>").append("<td class=\"_jCalender_border_left\">一</td><td>二</td><td>三</td><td>四</td><td>五</td><td>六</td><td>日</td><td>一</td><td>二</td><td>三</td><td>四</td><td>五</td><td>六</td><td class=\"_jCalender_border_right\">日</td>").appendTo(divBox_table);
            divBox_table.append("");
            // 添加左侧日历主体，共6行7列
            for (var i = 1; i <= 6; i++) {
                var mainTr = $("<tr></tr>");
                mainTr.append("<td id=\"" + this.divBoxId + i + "1_left\" class=\"_jCalender_content_main\"></td>");
                mainTr.append("<td id=\"" + this.divBoxId + i + "2_left\" class=\"_jCalender_content_main\"></td>");
                mainTr.append("<td id=\"" + this.divBoxId + i + "3_left\" class=\"_jCalender_content_main\"></td>");
                mainTr.append("<td id=\"" + this.divBoxId + i + "4_left\" class=\"_jCalender_content_main\"></td>");
                mainTr.append("<td id=\"" + this.divBoxId + i + "5_left\" class=\"_jCalender_content_main\"></td>");
                mainTr.append("<td id=\"" + this.divBoxId + i + "6_left\" class=\"_jCalender_content_main\"></td>");
                mainTr.append("<td id=\"" + this.divBoxId + i + "7_left\" class=\"_jCalender_content_main\"></td>");

                mainTr.append("<td id=\"" + this.divBoxId + i + "1_right\" class=\"_jCalender_content_main\"></td>");
                mainTr.append("<td id=\"" + this.divBoxId + i + "2_right\" class=\"_jCalender_content_main\"></td>");
                mainTr.append("<td id=\"" + this.divBoxId + i + "3_right\" class=\"_jCalender_content_main\"></td>");
                mainTr.append("<td id=\"" + this.divBoxId + i + "4_right\" class=\"_jCalender_content_main\"></td>");
                mainTr.append("<td id=\"" + this.divBoxId + i + "5_right\" class=\"_jCalender_content_main\"></td>");
                mainTr.append("<td id=\"" + this.divBoxId + i + "6_right\" class=\"_jCalender_content_main\"></td>");
                mainTr.append("<td id=\"" + this.divBoxId + i + "7_right\" class=\"_jCalender_content_main\"></td>");
                divBox_table.append(mainTr);
            };

            // 添加底部工具条
            var bottomToolTr = $("<tr class=\"_jCalender_bottom_tool\"></tr>");
            bottomToolTr.append("<td class=\"_jCalender_border_left\" colspan=\"7\"></td>");
            var bottomTool_left_Td = $("<td colspan=\"3\"></td>");
            if (this.opts.canClearDate === true) {
                $("<a href=\"javascript:void(0);\">清空日期</a>").click(function() {
                    _this.clearDate();
                }).appendTo(bottomTool_left_Td);
            } else {
                bottomTool_left_Td.append("");
            }
            bottomToolTr.append(bottomTool_left_Td);
            var bottomTool_right_Td = $("<td class=\"_jCalender_border_right\" colspan=\"4\"></td>");
            $("<a href=\"javascript:void(0);\">今天</a>").click(function() {
                _this.showToday();
            }).appendTo(bottomTool_right_Td);
            bottomTool_right_Td.append("&nbsp;&nbsp;&nbsp;");
            $("<a href=\"javascript:void(0);\">关闭</a>").click(function() {
                _this.dispose();
            }).appendTo(bottomTool_right_Td);
            bottomToolTr.append(bottomTool_right_Td);
            divBox_table.append(bottomToolTr);

            // 添加日历底部
            divBox_table.append("<tr><td class=\"_jCalender_bottom_left\"></td><td class=\"_jCalender_bottom_middle\" colspan=\"12\"></td><td class=\"_jCalender_bottom_right\"></td></tr>");
            divBox.append(divBox_table);

            // 判断IE浏览器
            var isIE = (document.all) ? true : false;
            var isIE6 = isIE && /msie 6/.test(navigator.userAgent.toLowerCase());
            if (isIE6 === true)
                divBox.append("<iframe style='position: absolute;z-index:-1;left: 0; top: 0; width: 100%; height: 100%; border: 0 none Gray; filter: alpha(opacity=0);opacity:0;'></iframe>");

            // 追加年选择
            var yearPop = $("<table id=\"" + this.year_pop_Id + "\" class=\"_jCalender_global_yearPop\" cellpadding=\"0\" cellspacing=\"0\"></table>");
            yearPop.hover(function() {
                $(this).css("display", "block");
            }, function() {
                $(this).stop(true, true);
                $(this).slideUp(100);
            });
            var yearPopLastGroup = $("<td class=\"_jCalender_global_yearPop_top\"></td>");
            yearPopLastGroup.click(function() {
                _this.yearLastGroup();
            });
            $("<tr></tr>").append(yearPopLastGroup).appendTo(yearPop);
            for (var i = 1; i <= 5; i++) {
                $("<tr></tr>").append("<td id=\"" + this.year_pop_Id + "_" + i + "\" class=\"_jCalender_global_yearPop_normal\">2009</td>").appendTo(yearPop);
            };
            var yearPopNextGroup = $("<td class=\"_jCalender_global_yearPop_bottom\"></td>");
            yearPopNextGroup.click(function() {
                _this.yearNextGroup();
            });
            $("<tr></tr>").append(yearPopNextGroup).appendTo(yearPop);
            divBox.append(yearPop);

            // 追加月选择
            var monthPop = $("<table id=\"" + this.month_pop_Id + "\" class=\"_jCalender_global_monthPop\" cellpadding=\"0\" cellspacing=\"0\"></table>");
            monthPop.hover(function() {
                $(this).css("display", "block");
            }, function() {
                $(this).stop(true, true);
                $(this).slideUp(100);
            });
            for (var i = 0; i < 6; i++) {
                $("<tr></tr>").append("<td id=\"" + this.month_pop_Id + "_" + (2 * i + 1) + "\" class=\"_jCalender_global_monthPop_normal\">" + (2 * i + 1) + "</td>").append("<td id=\"" + this.month_pop_Id + "_" + (2 * i + 2) + "\" class=\"_jCalender_global_monthPop_normal\">" + (2 * i + 2) + "</td>").appendTo(monthPop);
            }
            divBox.append(monthPop);

            return divBox;
        },

        // 单日历控件赋值
        // year：日历显示的年份
        // month：日历显示的月份
        // selectedDate：选择的日期
        pushSingleCalender: function(year, month) {
            var _this = this;
            // 月初
            var startDate = new Date(year, month, 1);
            // 月末
            var endDate = new Date(year, month + 1, 0);

            // 赋值年
            $("#" + this.left_year_Id).val(year);
            // 赋值月份
            $("#" + this.left_month_Id).val(this.monthOrDayToString(month + 1));

            // 赋值日历的内容
            var startWeek = startDate.getDay();
            if (startWeek == 0)
                startWeek = 7;

            var nowDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() - startWeek + 1);
            var td = null;
            for (var i = 1; i <= 6; i++) {
                for (var j = 1; j <= 7; j++) {
                    td = $("#" + this.divBoxId + i + j);

                    // 日期赋值
                    td.html(this.monthOrDayToString(nowDate.getDate())).attr("itemDate", nowDate.getFullYear() + "-" + this.monthOrDayToString(nowDate.getMonth() + 1) + "-" + this.monthOrDayToString(nowDate.getDate()));
                    td.unbind("mouseover").unbind("mouseout").unbind("click");

                    // 是否需要绑定事件
                    var bindEvent = false;

                    if (nowDate < startDate || nowDate > endDate) {
                        // 当月前后
                        if (this.compareDate(nowDate, this.today) < 0) {
                            // 今天以前
                            if (this.opts.otherDays > 0 && this.opts.yesterdays > 0) {
                                td.attr("itemClass", "_jCalender_content_sub").removeClass().addClass("_jCalender_content_sub");
                            } else {
                                td.html("").attr("itemDate", "").removeClass().addClass("_jCalender_content_sub");
                            }

                            if (this.opts.otherDays == 1 && this.opts.yesterdays == 1)
                                bindEvent = true;
                        } else {
                            // 今天以后
                            if (this.opts.otherDays > 0) {
                                td.attr("itemClass", "_jCalender_content_sub").removeClass().addClass("_jCalender_content_sub");
                            } else {
                                td.html("").attr("itemDate", "").removeClass().addClass("_jCalender_content_sub");
                            }

                            if (this.opts.otherDays == 1)
                                bindEvent = true;
                        }

                        if (this.getSpecialDateSign()) {
                            if (this.compareDate(nowDate, this.startDate) < 0 || this.compareDate(nowDate, this.endDate) >= 0)
                                bindEvent = false;
                            else {
                                if (bindEvent == true) {
                                    td.attr("itemClass", "_jCalender_content_sub_rang").removeClass().addClass('_jCalender_content_sub_rang');
                                }
                            }
                        }
                    } else {
                        // 当月
                        var cmD = this.compareDate(nowDate, this.today);
                        if (cmD < 0) {
                            if (this.opts.yesterdays == 1) {
                                bindEvent = true;
                                if (this.compareDate(nowDate, this.selectedDate) == 0) {
                                    td.attr("itemClass", "_jCalender_content_sel").removeClass().addClass("_jCalender_content_sel");
                                } else {
                                    td.attr("itemClass", "_jCalender_content_main").removeClass().addClass("_jCalender_content_main");
                                }
                            } else if (this.opts.yesterdays == 2) {
                                td.attr("itemClass", "_jCalender_content_enabled").removeClass().addClass("_jCalender_content_enabled");
                            } else {
                                td.html("").attr("itemDate", "").removeClass().addClass("_jCalender_content_sub");
                            }
                        } else if (cmD == 0) {
                            bindEvent = true;
                            td.attr("itemClass", "_jCalender_content_today").removeClass().addClass("_jCalender_content_today");
                        } else {
                            bindEvent = true;
                            if (this.compareDate(nowDate, this.selectedDate) == 0) {
                                td.attr("itemClass", "_jCalender_content_sel").removeClass().addClass("_jCalender_content_sel");
                            } else {
                                td.attr("itemClass", "_jCalender_content_main").removeClass().addClass("_jCalender_content_main");
                            }
                        }

                        if (this.getSpecialDateSign()) {
                            if (this.compareDate(nowDate, this.startDate) < 0 || this.compareDate(nowDate, this.endDate) >= 0) {
                                bindEvent = false;
                                td.removeClass().addClass("_jCalender_content_enabled");
                            } else {
                                if (bindEvent == true && td.attr("itemClass") != "_jCalender_content_sel") {
                                    td.attr("itemClass", "_jCalender_content_main_rang").removeClass().addClass('_jCalender_content_main_rang');
                                }
                            }
                        }
                    }

                    if (bindEvent == true) {
                        td.bind("mouseover", _this.itemMouseover);
                        td.bind("mouseout", _this.itemMouseout);
                        td.bind("click", function() {
                            _this.itemSelected(this);
                        });
                        td.css("cursor", "pointer");
                    } else {
                        td.css("cursor", "default");
                    }

                    nowDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 1);
                }
            }
        },

        // 双日历控件赋值
        // year：日历显示的年份
        // month：日历显示的月份
        // selectedDate：选择的日期
        pushDoubleCalender: function(year, month) {
            var _this = this;
            // 左侧月初
            var startDate_left = new Date(year, month, 1);
            // 左侧月末
            var endDate_left = new Date(year, month + 1, 0);

            // 左侧赋值年
            $("#" + this.left_year_Id).val(year);
            // 左侧赋值月份
            $("#" + this.left_month_Id).val(this.monthOrDayToString(month + 1));

            // 赋值日历的内容
            var startWeek_left = startDate_left.getDay();
            if (startWeek_left == 0)
                startWeek_left = 7;

            var nowDate_left = new Date(startDate_left.getFullYear(), startDate_left.getMonth(), startDate_left.getDate() - startWeek_left + 1);
            var td = null;
            for (var i = 1; i <= 6; i++) {
                for (var j = 1; j <= 7; j++) {
                    td = $("#" + this.divBoxId + i + j + "_left");

                    // 日期赋值
                    td.html(this.monthOrDayToString(nowDate_left.getDate())).attr("itemDate", nowDate_left.getFullYear() + "-" + this.monthOrDayToString(nowDate_left.getMonth() + 1) + "-" + this.monthOrDayToString(nowDate_left.getDate()));
                    td.unbind("mouseover").unbind("mouseout").unbind("click");

                    // 是否需要绑定事件
                    var bindEvent = false;

                    if (nowDate_left < startDate_left || nowDate_left > endDate_left) {
                        // 当月前后
                        if (this.compareDate(nowDate_left, this.today) < 0) {
                            // 今天以前
                            if (this.opts.otherDays > 0 && this.opts.yesterdays > 0) {
                                td.attr("itemClass", "_jCalender_content_sub").removeClass().addClass("_jCalender_content_sub");
                            } else {
                                td.html("").attr("itemDate", "").removeClass().addClass("_jCalender_content_sub");
                            }

                            if (this.opts.otherDays == 1 && this.opts.yesterdays == 1)
                                bindEvent = true;
                        } else {
                            // 今天以后
                            if (this.opts.otherDays > 0) {
                                td.attr("itemClass", "_jCalender_content_sub").removeClass().addClass("_jCalender_content_sub");
                            } else {
                                td.html("").attr("itemDate", "").removeClass().addClass("_jCalender_content_sub");
                            }

                            if (this.opts.otherDays == 1)
                                bindEvent = true;
                        }

                        if (this.getSpecialDateSign()) {
                            if (this.compareDate(nowDate_left, this.startDate) < 0 || this.compareDate(nowDate_left, this.endDate) >= 0)
                                bindEvent = false;
                            else {
                                if (bindEvent == true) {
                                    td.attr("itemClass", "_jCalender_content_sub_rang").removeClass().addClass('_jCalender_content_sub_rang');
                                }
                            }
                        }
                    } else {
                        // 当月
                        var cmD = this.compareDate(nowDate_left, this.today);
                        if (cmD < 0) {
                            if (this.opts.yesterdays == 1) {
                                bindEvent = true;
                                if (this.compareDate(nowDate_left, this.selectedDate) == 0) {
                                    td.attr("itemClass", "_jCalender_content_sel").removeClass().addClass("_jCalender_content_sel");
                                } else {
                                    td.attr("itemClass", "_jCalender_content_main").removeClass().addClass("_jCalender_content_main");
                                }
                            } else if (this.opts.yesterdays == 2) {
                                td.attr("itemClass", "_jCalender_content_sub").removeClass().addClass("_jCalender_content_sub");
                            } else {
                                td.html("").attr("itemDate", "").removeClass().addClass("_jCalender_content_sub");
                            }
                        } else if (cmD == 0) {
                            bindEvent = true;
                            td.attr("itemClass", "_jCalender_content_today").removeClass().addClass("_jCalender_content_today");
                        } else {
                            bindEvent = true;
                            if (this.compareDate(nowDate_left, this.selectedDate) == 0) {
                                td.attr("itemClass", "_jCalender_content_sel").removeClass().addClass("_jCalender_content_sel");
                            } else {
                                td.attr("itemClass", "_jCalender_content_main").removeClass().addClass("_jCalender_content_main");
                            }
                        }

                        if (this.getSpecialDateSign()) {
                            if (this.compareDate(nowDate_left, this.startDate) < 0 || this.compareDate(nowDate_left, this.endDate) >= 0) {
                                bindEvent = false;
                                td.removeClass().addClass("_jCalender_content_enabled");
                            } else {
                                if (bindEvent == true && td.attr("itemClass") != "_jCalender_content_sel") {
                                    td.attr("itemClass", "_jCalender_content_main_rang").removeClass().addClass('_jCalender_content_main_rang');
                                }
                            }
                        }
                    }

                    if (bindEvent == true) {
                        td.bind("mouseover", _this.itemMouseover);
                        td.bind("mouseout", _this.itemMouseout);
                        td.bind("click", function() {
                            _this.itemSelected(this);
                        });
                        td.css("cursor", "pointer");
                    } else {
                        td.css("cursor", "default");
                    }

                    nowDate_left = new Date(nowDate_left.getFullYear(), nowDate_left.getMonth(), nowDate_left.getDate() + 1);
                }
            }

            // 右侧月初
            var startDate_right = new Date(endDate_left.getFullYear(), endDate_left.getMonth(), endDate_left.getDate() + 1);
            // 右侧月末
            var endDate_right = new Date(startDate_right.getFullYear(), startDate_right.getMonth() + 1, 0);

            // 右侧赋值年
            $("#" + this.right_year_Id).val(startDate_right.getFullYear());
            // 右侧赋值月份
            $("#" + this.right_month_Id).val(this.monthOrDayToString(startDate_right.getMonth() + 1));

            // 赋值日历的内容
            var startWeek_right = startDate_right.getDay();
            if (startWeek_right == 0)
                startWeek_right = 7;

            var nowDate_right = new Date(startDate_right.getFullYear(), startDate_right.getMonth(), startDate_right.getDate() - startWeek_right + 1);
            var td = null;
            for (var i = 1; i <= 6; i++) {
                for (var j = 1; j <= 7; j++) {
                    td = $("#" + this.divBoxId + i + j + "_right");

                    // 日期赋值
                    td.html(this.monthOrDayToString(nowDate_right.getDate())).attr("itemDate", nowDate_right.getFullYear() + "-" + this.monthOrDayToString(nowDate_right.getMonth() + 1) + "-" + this.monthOrDayToString(nowDate_right.getDate()));
                    td.unbind("mouseover").unbind("mouseout").unbind("click");

                    // 是否需要绑定事件
                    var bindEvent = false;

                    if (nowDate_right < startDate_right || nowDate_right > endDate_right) {
                        // 当月前或当月后
                        if (this.compareDate(nowDate_right, this.today) < 0) {
                            // 今天以前
                            if (this.opts.otherDays > 0 && this.opts.yesterdays > 0) {
                                td.attr("itemClass", "_jCalender_content_sub").removeClass().addClass("_jCalender_content_sub");
                            } else {
                                td.html("").attr("itemDate", "").removeClass().addClass("_jCalender_content_sub");
                            }

                            if (this.opts.otherDays == 1 && this.opts.yesterdays == 1)
                                bindEvent = true;
                        } else {
                            // 今天以后
                            if (this.opts.otherDays > 0) {
                                td.attr("itemClass", "_jCalender_content_sub").removeClass().addClass("_jCalender_content_sub");
                            } else {
                                td.html("").attr("itemDate", "").removeClass().addClass("_jCalender_content_sub");
                            }

                            if (this.opts.otherDays == 1)
                                bindEvent = true;
                        }

                        if (this.getSpecialDateSign()) {
                            if (this.compareDate(nowDate_right, this.startDate) < 0 || this.compareDate(nowDate_right, this.endDate) >= 0)
                                bindEvent = false;
                            else {
                                if (bindEvent == true) {
                                    td.attr("itemClass", "_jCalender_content_rang").removeClass().addClass('_jCalender_content_rang');
                                }
                            }
                        }
                    } else {
                        // 当月
                        var cmD = this.compareDate(nowDate_right, this.today);
                        if (cmD < 0) {
                            if (this.opts.yesterdays == 1) {
                                bindEvent = true;
                                if (this.compareDate(nowDate_right, this.selectedDate) == 0) {
                                    td.attr("itemClass", "_jCalender_content_sel").removeClass().addClass("_jCalender_content_sel");
                                } else {
                                    td.attr("itemClass", "_jCalender_content_main").removeClass().addClass("_jCalender_content_main");
                                }
                            } else if (this.opts.yesterdays == 2) {
                                td.attr("itemClass", "_jCalender_content_sub").removeClass().addClass("_jCalender_content_sub");
                            } else {
                                td.html("").attr("itemDate", "").removeClass().addClass("_jCalender_content_sub");
                            }
                        } else if (cmD == 0) {
                            bindEvent = true;
                            td.attr("itemClass", "_jCalender_content_today").removeClass().addClass("_jCalender_content_today");
                        } else {
                            bindEvent = true;
                            if (this.compareDate(nowDate_right, this.selectedDate) == 0) {
                                td.attr("itemClass", "_jCalender_content_sel").removeClass().addClass("_jCalender_content_sel");
                            } else {
                                td.attr("itemClass", "_jCalender_content_main").removeClass().addClass("_jCalender_content_main");
                            }
                        }

                        if (this.getSpecialDateSign()) {
                            if (this.compareDate(nowDate_right, this.startDate) < 0 || this.compareDate(nowDate_right, this.endDate) >= 0) {
                                bindEvent = false;
                                td.removeClass().addClass("_jCalender_content_enabled");
                            } else {
                                if (bindEvent == true && td.attr("itemClass") != "_jCalender_content_sel") {
                                    td.attr("itemClass", "_jCalender_content_main_rang").removeClass().addClass('_jCalender_content_main_rang');
                                }
                            }
                        }
                    }

                    if (bindEvent == true) {
                        td.bind("mouseover", _this.itemMouseover);
                        td.bind("mouseout", _this.itemMouseout);
                        td.bind("click", function() {
                            _this.itemSelected(this);
                        });
                        td.css("cursor", "pointer");
                    } else {
                        td.css("cursor", "default");
                    }

                    nowDate_right = new Date(nowDate_right.getFullYear(), nowDate_right.getMonth(), nowDate_right.getDate() + 1);
                }
            }
        },

        // 显示日历控件
        showCalender: function() {
            var _this = this;
            this.getDate();

            // 当前显示的月份
            var showDate = this.today;
            if (this.selectedDate != null) {
                if (this.opts.yesterdays == 1 || this.compareDate(this.selectedDate, this.today) >= 0) {
                    showDate = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), 1);
                }
            }

            if (this.getSpecialDateSign()) {
                if (this.compareDate(showDate, this.startDate) < 0 || this.compareDate(showDate, this.endDate) >= 0) {
                    showDate = this.startDate;
                }
            }

            if (this.opts.createType == 'double')
                this.pushDoubleCalender(showDate.getFullYear(), showDate.getMonth());
            else
                this.pushSingleCalender(showDate.getFullYear(), showDate.getMonth());

            // 隐藏所有其他对象
            var gloabl_pop_list = $(document).data("$jquery_control_gloabl_pop_list$");
            if (gloabl_pop_list != undefined && $.isArray(gloabl_pop_list)) {
                $.each(gloabl_pop_list, function(i, n) {
                    try {
                        if (n != _this)
                            $("#" + n.divBoxId).css("display", "none");
                    } catch (e) {
                    }
                });
            }

            // 定位并显示
            var position = this.getPopPosition($("#" + this.textBoxId));
            if (this.opts.align == 'right')
                $("#" + this.divBoxId).css("top", (position.top + position.height) + "px").css("left", (position.left + position.width - $("#" + this.divBoxId).outerWidth(true)) + "px").show();
            else
                $("#" + this.divBoxId).css("top", (position.top + position.height) + "px").css("left", position.left + "px").show();
        },

        // 上一个月
        lastMonth: function() {
            this.getDate();

            var year = parseInt($("#" + this.left_year_Id).val(), 10);
            var month = parseInt($("#" + this.left_month_Id).val(), 10);
            var showDate = new Date(year, month - 1, 1);

            var compare = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
            if (this.opts.yesterdays != 0 || this.compareDate(showDate, compare) > 0) {
                if (this.opts.createType == 'double') {
                    showDate = new Date(showDate.getFullYear(), showDate.getMonth() - 2, 1);
                    this.pushDoubleCalender(showDate.getFullYear(), showDate.getMonth());
                } else {
                    showDate = new Date(showDate.getFullYear(), showDate.getMonth() - 1, 1);
                    this.pushSingleCalender(showDate.getFullYear(), showDate.getMonth());
                }
            }
        },

        // 下一个月
        nextMonth: function() {
            this.getDate();

            var year = parseInt($("#" + this.left_year_Id).val(), 10);
            var month = parseInt($("#" + this.left_month_Id).val(), 10);

            var showDate = new Date(year, month - 1, 1);

            if (this.opts.createType == 'double') {
                showDate = new Date(showDate.getFullYear(), showDate.getMonth() + 2, 1);
                this.pushDoubleCalender(showDate.getFullYear(), showDate.getMonth());
            } else {
                showDate = new Date(showDate.getFullYear(), showDate.getMonth() + 1, 1);
                this.pushSingleCalender(showDate.getFullYear(), showDate.getMonth());
            }
        },

        // 日历鼠标悬停方法
        itemMouseover: function() {
            $(this).removeClass().addClass("_jCalender_content_sel");
        },

        // 日历鼠标离开方法
        itemMouseout: function() {
            $(this).removeClass().addClass($(this).attr("itemClass"));
        },

        // 日历鼠标点击
        itemSelected: function(itemObj) {
            $("#" + this.textBoxId).val($(itemObj).attr("itemDate"));
            this.dispose();
        },

        // 清空日期
        clearDate: function() {
            $("#" + this.textBoxId).val('');
            this.dispose();
        },

        // 今天
        showToday: function() {
            this.getDate();
            $("#" + this.textBoxId).val(this.today.getFullYear() + "-" + this.monthOrDayToString(this.today.getMonth() + 1) + "-" + this.monthOrDayToString(this.today.getDate()));
            this.dispose();
        },

        // 关闭当前控件方法
        dispose: function() {
            $("#" + this.divBoxId).hide();
            if ($.isFunction(this.hideFun)) {
                this.hideFun.apply($("#" + this.textBoxId).get(0));
            }
        },

        // 显示年选择
        yearShow: function(yearTextId, monthTextId) {
            var yearText = $("#" + yearTextId);
            var year = parseInt(yearText.val(), 10);
            var firstYear = year - 2;

            firstYear = this.yearPushList(firstYear, year);

            var position = this.getPopPosition(yearText);
            var yearPop = $("#" + this.year_pop_Id);
            yearPop.attr("yearTextId", yearTextId).attr("monthTextId", monthTextId).attr("lastYear", firstYear - 1).css("top", (position.top + position.height) + "px").css("left", (position.left + position.width / 2 - yearPop.outerWidth() / 2) + "px").slideDown(100);
        },

        // 年选择，上一组
        yearLastGroup: function() {
            var yearPop = $("#" + this.year_pop_Id);
            var year = parseInt($("#" + yearPop.attr("yearTextId")).val(), 10);
            var now = new Date();

            if (this.opts.otherDays > 0 || parseInt(yearPop.attr("lastYear"), 10) - 4 > now.getFullYear()) {
                var firstYear = parseInt(yearPop.attr("lastYear"), 10) - 9;
                firstYear = this.yearPushList(firstYear, year);
                yearPop.attr("lastYear", firstYear - 1);
            }
        },

        // 年选择，下一组
        yearNextGroup: function() {
            var yearPop = $("#" + this.year_pop_Id);
            var year = parseInt($("#" + yearPop.attr("yearTextId")).val(), 10);
            var firstYear = parseInt(yearPop.attr("lastYear"), 10) + 1;

            firstYear = this.yearPushList(firstYear, year);
            yearPop.attr("lastYear", firstYear - 1);
        },

        // 年选择鼠标悬停方法
        yearItemMouseover: function() {
            $(this).removeClass().addClass("_jCalender_global_yearPop_selected");
        },

        // 年选择鼠标离开方法
        yearItemMouseout: function() {
            $(this).removeClass().addClass($(this).attr("itemClass"));
        },

        // 年选择鼠标点击
        yearItemSelected: function(itemObj) {
            var yearPop = $("#" + this.year_pop_Id);
            yearPop.css("display", "none");

            var yearTextId = yearPop.attr("yearTextId");
            var monthTextId = yearPop.attr("monthTextId");
            $("#" + yearTextId).val($(itemObj).html());

            this.getDate();

            var year = parseInt($("#" + yearTextId).val(), 10);
            var month = parseInt($("#" + monthTextId).val(), 10);

            var showDate = new Date(year, month - 1, 1);
            showDate = new Date(showDate.getFullYear(), showDate.getMonth(), 1);

            if (this.opts.createType == 'single') {
                this.pushSingleCalender(showDate.getFullYear(), showDate.getMonth());
            } else {
                this.pushDoubleCalender(showDate.getFullYear(), showDate.getMonth());
            }
        },

        // 年选择赋值
        yearPushList: function(firstYear, year) {
            var _this = this;

            if (this.opts.yesterdays == 0 && firstYear < this.today.getFullYear())
                firstYear = this.today.getFullYear();

            for (var i = 1; i <= 5; i++) {
                var td = $("#" + this.year_pop_Id + "_" + i);
                td.html(firstYear);

                td.unbind("mouseover").bind("mouseover", _this.yearItemMouseover);
                td.unbind("mouseout").bind("mouseout", _this.yearItemMouseout);
                td.unbind("click").bind("click", function() {
                    _this.yearItemSelected(this)
                });

                if (firstYear == year) {
                    $("#" + this.year_pop_Id + "_" + i).attr("itemClass", "_jCalender_global_yearPop_selected").removeClass().addClass("_jCalender_global_yearPop_selected");
                } else {
                    $("#" + this.year_pop_Id + "_" + i).attr("itemClass", "_jCalender_global_yearPop_bindEvent").removeClass().addClass("_jCalender_global_yearPop_normal");
                }

                firstYear++;
            }
            return firstYear;
        },

        // 显示月选择
        monthShow: function(yearTextId, monthTextId) {
            var _this = this;
            var monthText = $("#" + monthTextId);
            var month = parseInt(monthText.val(), 10);
            var now = new Date();
            for (var i = 1; i <= 12; i++) {
                var td = $("#" + this.month_pop_Id + "_" + i);

                td.unbind("mouseover").unbind("mouseout").unbind("click");

                var bindEvent = false;
                if (i == month) {
                    bindEvent = true;
                    td.attr("itemClass", "_jCalender_global_yearPop_selected").removeClass().addClass("_jCalender_global_yearPop_selected");
                } else {
                    if (this.opts.yesterdays == 0 && parseInt(this.today.getMonth(), 10) + 1 < i) {
                        td.attr("itemClass", "_jCalender_global_monthPop_enabled").removeClass().addClass("_jCalender_global_monthPop_enabled");
                    } else {
                        bindEvent = true;
                        td.attr("itemClass", "_jCalender_global_monthPop_normal").removeClass().addClass("_jCalender_global_monthPop_normal");
                    }
                }

                if (bindEvent == true) {
                    td.bind("mouseover", _this.monthItemMouseover);
                    td.bind("mouseout", _this.monthItemMouseout);
                    td.bind("click", function() {
                        _this.monthItemSelected(this)
                    });
                }
            }

            var position = this.getPopPosition(monthText);
            var monthPop = $("#" + this.month_pop_Id);
            monthPop.attr("yearTextId", yearTextId).attr("monthTextId", monthTextId).css("top", (position.top + position.height) + "px").css("left", (position.left + position.width / 2 - monthPop.outerWidth() / 2) + "px").slideDown(100);
        },

        // 年选择鼠标悬停方法
        monthItemMouseover: function() {
            $(this).removeClass().addClass("_jCalender_global_monthPop_selected");
        },

        // 年选择鼠标离开方法
        monthItemMouseout: function() {
            $(this).removeClass().addClass($(this).attr("itemClass"));
        },

        // 年选择鼠标点击
        monthItemSelected: function(itemObj) {
            var monthPop = $("#" + this.month_pop_Id);
            monthPop.css("display", "none");

            var yearTextId = monthPop.attr("yearTextId");
            var monthTextId = monthPop.attr("monthTextId");
            $("#" + monthTextId).val($(itemObj).html());

            this.getDate();

            var year = parseInt($("#" + yearTextId).val(), 10);
            var month = parseInt($("#" + monthTextId).val(), 10);

            var showDate = new Date(year, month - 1, 1);
            showDate = new Date(showDate.getFullYear(), showDate.getMonth(), 1);

            if (this.opts.createType == 'single') {
                this.pushSingleCalender(showDate.getFullYear(), showDate.getMonth());
            } else {
                this.pushDoubleCalender(showDate.getFullYear(), showDate.getMonth());
            }
        },

        // 日历控件显示定位
        getPopPosition: function(obj) {
            var position;
            position = {
                left: obj.position().left,
                top: obj.position().top,
                width: obj.outerWidth(true),
                height: obj.outerHeight(true)
            };
            return position;
        },

        // 月份/日期显示MM/dd处理
        monthOrDayToString: function(monthOrDay) {
            if (monthOrDay < 10)
                return "0" + parseInt(monthOrDay, 10);
            else
                return monthOrDay.toString();
        },

        // 将字符串日期转为日期对象
        convertStringToDate: function(dateStr) {
            if (dateStr != '' && /^(19|20)\d{2}-(0?\d|1[012])-(0?\d|[12]\d|3[01])$/.test(dateStr)) {
                return new Date(dateStr.split('-')[0], parseInt(dateStr.split('-')[1], 10) - 1, parseInt(dateStr.split('-')[2], 10));
            } else {
                return null;
            }
        },

        // 比较两个日期的大小
        // 0：相等，1：第一个大于第二个，-1：第一个小于第二个
        compareDate: function(date1, date2) {
            var d1 = Date.parse(date1);
            var d2 = Date.parse(date2);

            if (d1 === d2)
                return 0;
            else if (d1 > d2)
                return 1;
            else
                return -1;
        },

        // 获取相关日期参数
        getDate: function() {
            // 今天的日期
            var now = new Date();
            var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

            // 文本框的日期
            var textVal = $("#" + this.textBoxId).val();
            var selectedDate = this.convertStringToDate(textVal);

            this.today = today;
            this.selectedDate = selectedDate;
            if (this.opts.startDateObj != null) {
                this.startDate = this.convertStringToDate(this.opts.startDateObj.val());
                if (this.startDate != null)
                    this.endDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate() + this.opts.dayLong);
            }
        },

        // 获取是否是组合日历控件的判断
        getSpecialDateSign: function() {
            return this.opts.startDateObj != null && this.opts.dayLong > 0 && this.startDate != null;
        }
    };

    $.fn.jCalender = function(opts, fn) {

        if (opts && opts.createType && opts.createType == 'double') {
            opts = $.extend({
                createType: 'double',
                otherShowCtrl: null,
                otherDays: 0,
                yesterdays: 2,
                canClearDate: false,
                startDateObj: null,
                dayLong: 0,
                align:'left'
            }, opts);
        } else {
            opts = $.extend({
                createType: 'single',
                otherShowCtrl: null,
                otherDays: 1,
                yesterdays: 1,
                canClearDate: false,
                startDateObj: null,
                dayLong: 0,
                align:'left'
            }, opts);
        };

        // 显示日期的文本框ID
        var textBoxId = $(this).attr("id");

        // 创建日历控件，并添加到页面中
        var calender = new jCalender(textBoxId, opts, fn);
        var divBox = null;
        if (opts.createType == 'double')
            divBox = calender.createDoubleCalender();
        else
            divBox = calender.createSingleCalender();

        $(this).after(divBox);
        $(this).click(function(event) {
            calender.showCalender();
            event.stopPropagation();
        });
        if (opts.otherShowCtrl != null) {
            $(opts.otherShowCtrl).click(function(event) {
                calender.showCalender();
                event.stopPropagation();
            });
        }
        $(document).click(function() {
            if (divBox.css("display") == "block") {
                calender.dispose();
            }
        });
        divBox.click(function(event) {
            event.stopPropagation();
        });

        var gloabl_pop_list = $(document).data("$jquery_control_gloabl_pop_list$");
        if (gloabl_pop_list == undefined || !$.isArray(gloabl_pop_list)) {
            gloabl_pop_list = new Array();
        }
        gloabl_pop_list.push(calender);
        $(document).data("$jquery_control_gloabl_pop_list$", gloabl_pop_list);
    };

})(jQuery);
