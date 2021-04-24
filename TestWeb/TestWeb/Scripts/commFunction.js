/*
说明：通用功能方法，例如：去空格、居中弹出窗口、防止按钮重复点击
*/

var commFunction = {
    openWin: function (url, winWidth, winHeight, sFeatures) {
        /// <summary>打开新窗口</summary>
        /// <param name="url">[必填]打开的地址</param>
        /// <param name="winWidth">[可空] 窗口宽度</param>
        /// <param name="winHeight">[可空] 窗口高度</param>
        /// <param name="sFeatures">[可空] 参数</param>
        if (url.toString().indexOf('?', 0) > 0)
            url += '&rmd=' + Math.random();
        else
            url += '?rmd=' + Math.random();

        winWidth = winWidth ? winWidth : 900;
        winHeight = winHeight ? winHeight : 800;
        var left = 0;
        var top = 0;
        if (screen.availWidth > winWidth)
            left = (screen.availWidth - winWidth) / 2
        if (screen.availHeight > winHeight)
            top = (screen.availHeight - winHeight) / 2

        sFeatures = sFeatures ? sFeatures : "location=yes,menubar=no,status=yes,resizable=yes,toolbar=no,scrollbars=yes,width=" + winWidth + "px,height=" + winHeight + "px,top=" + top + ",left=" + left;
        window.open(url, "_blank", sFeatures, false);
    },
    trim: function (text, type) {
        /// <summary>去掉字符收尾的空格</summary>
        /// <param name="text">[必填] 字符</param>
        /// <param name="type">[可空] 类型：0-去前面空格，1-去后面空格，【不传：去前后空格】</param>
        if (type == '0')
            return (text || "").replace(/^\s+/g, "");
        else if (type == '1')
            return (text || "").replace(/\s+$/g, "");
        else
            return (text || "").replace(/^\s+|\s+$/g, "");
    },   
    getPopPosition: function (divval) {
        var position;
        position = {
            left: $("#" + divval).position().left,
            top: $("#" + divval).position().top + $("#" + divval).height()
        };
        return position;
    },
    convertJson: function (text) {
        return text.replace(/\'/g, "“").replace(/{/g, "｛").replace(/}/g, "}").replace(/\\/g, "|").replace(/:/g, "：");
    },
    commitAjax: function (obj, type, requrl, getparamfun, successfun, errorfun, completefun, pageValidator, ajaxParam) {
        this.commitAjaxObj({
            obj: obj,
            type: type,
            reqUrl: requrl,
            getParamFun: getparamfun,
            successFun: successfun,
            errorFun: errorfun,
            completeFun: completefun,
            pageValidator: pageValidator,
            ajaxParam: ajaxParam
        });
    },
    getParamFormData: function (all_param_json) {
        var ajaxdata = "{Json:'{";
        var ac_data = "";
        var regex = null, match = null;
        for (var i = 0; i < all_param_json.length; i++) {
            var key = all_param_json[i][0], value = encodeURIComponent(all_param_json[i][1]);
            //组数据,字符串叠加 逗号分割
            var isrepeat = (',' + ac_data).indexOf(',' + key + ':') > -1;
            !isrepeat && (ac_data += key + ":'" + value + "',");
            isrepeat && (regex = eval("/," + key + ":'([\\s\\S]*?)'/"),
                         match = regex.exec(',' + ac_data),
                         (match && (
                            ac_data = ac_data.replace(key + ":'" + match[1] + "'", key + ":'" + match[1] + "," + value + "'"))
                          ));
        }
        ajaxdata += ac_data.replace(/,$/gi, "").replace(/'/g, "%27") + "}'}";
        return ajaxdata;
    },
    resetAllControl: function (type) {

        type = (type == "" || type == null || type == undefined) ? "" : type + "_";
        //表单txt输入控件
        var inputlist = $("input[asub='" + type + "text']");
        //表单textarea控件
        var textarealist = $("textarea[asub='" + type + "textarea']");
        //表单下拉框控件
        var selectlist = $("select[asub='" + type + "select']");
        //表单单选控件
        var radiolist = $("input[asub='" + type + "radio']");
        //表单复选控件
        var checkboxlist = $("input[asub='" + type + "checkbox']");

        //处理txt输入控件
        inputlist.each(function () {
            $(this).val('');
        });

        //处理textarea输入控件
        textarealist.each(function () {
            $(this).prop("innerHTML", "");
            $(this).val("");
        });

        //处理下拉框控件
        selectlist.each(function () {
            var id = $(this).attr("id");
            $("#" + id + " option:first").prop("selected", 'selected');
        });

        var select_name_str = "";
        //处理单选按钮           
        radiolist.each(function () {
            var name = $(this).attr("name");
            if (select_name_str.indexOf(name) == -1) {
                var arr = $("input[name='" + name + "']");
                $.each(arr, function () {
                    $(this).prop("checked", "checked");
                    return false;
                });
                select_name_str += name + ",";
            }
        });

        select_name_str = "";
        //处理复选按钮           
        checkboxlist.each(function () {
            var name = $(this).attr("name");
            if (select_name_str.indexOf(name) == -1) {
                var arr = $("input[name='" + name + "']");
                $.each(arr, function () {
                    $(this).prop("checked", "");
                });
                select_name_str += name + ",";
            }
        });

    },
    covringPositionToPage: function (type, jsondata) {
        /// <summary>表单赋值事件</summary>     
        /// <param name="type">[可空] 页面存在多个表单时使用 asub对应的值为:type_(text,select,radio,checkbox,submit,span)</param>
        /// <param name="jsondata">[必填] 填充的数据 格式:{FildeName:'Value',FildeName:'Value'}</param>

        if (typeof jsondata == "string")
            jsondata = eval('(' + decodeURIComponent(jsondata) + ')');
        if (typeof jsondata == "object") {
            type = (type == "" || type == null || type == undefined) ? "" : type + "_";

            //表单txt输入控件
            var inputlist = $("input[asub='" + type + "text']");
            //表单textarea控件
            var textarealist = $("textarea[asub='" + type + "textarea']");
            //表单span控件
            var spanlist = $("span[asub='" + type + "span']");
            //表单下拉框控件
            var selectlist = $("select[asub='" + type + "select']");
            //表单单选控件
            var radiolist = $("input[asub='" + type + "radio']");
            //表单复选控件
            var checkboxlist = $("input[asub='" + type + "checkbox']");

            //处理txt输入控件
            inputlist.each(function () {
                var id = $(this).attr("id");
                !id && (id = $(this).attr("name"));
                var idstr_list = id.split('_');
                id = idstr_list[idstr_list.length - 1];
                var value = "";
                if (eval("jsondata." + id) || eval("jsondata." + id) == "") {
                    value = eval("jsondata." + id);
                    value = decodeURIComponent(value);
                    if (id == "PageIndex")
                        return true;
                    $(this).val(value);
                }
            });

            //处理textarea输入控件
            textarealist.each(function () {
                var id = $(this).attr("id");
                !id && (id = $(this).attr("name"));
                var idstr_list = id.split('_');
                id = idstr_list[idstr_list.length - 1];
                var value = "";
                if (eval("jsondata." + id) || eval("jsondata." + id) == "") {
                    value = eval("jsondata." + id);
                    value = decodeURIComponent(value);
                    $(this).val(value);
                }
            });

            //处理span控件
            spanlist.each(function () {
                var id = $(this).attr("id");
                !id && (id = $(this).attr("name"));
                var idstr_list = id.split('_');
                id = idstr_list[idstr_list.length - 1];
                var value = "";
                if (eval("jsondata." + id) || eval("jsondata." + id) == "") {
                    value = eval("jsondata." + id);
                    value = decodeURIComponent(value);
                    $(this).html(value);
                }
            });

            //处理下拉框控件
            selectlist.each(function () {
                var id = $(this).attr("id");
                !id && (id = $(this).attr("name"));
                var idstr_list = id.split('_');
                id = idstr_list[idstr_list.length - 1];
                var value = "";
                if (eval("jsondata." + id) || eval("jsondata." + id) == "") {
                    value = eval("jsondata." + id);
                    value = decodeURIComponent(value);
                    $(this).val(value);
                }
            });

            var select_name_str = "";
            //处理单选按钮           
            radiolist.each(function () {
                var name = $(this).attr("name");
                !name && $(this).attr("id");
                if (!name)
                    return true;
                var idstr_list = name.split('_');
                var id = idstr_list[idstr_list.length - 1];

                if (select_name_str.indexOf(name) == -1) {
                    if (eval("jsondata." + id) || eval("jsondata." + id) == 0) {
                        var arr = $("input[name='" + name + "']");
                        $.each(arr, function () {
                            var value = $(this).val();
                            value = decodeURIComponent(value);
                            if (value == eval("jsondata." + id)) {
                                $(this).prop("checked", "checked");
                                return false;
                            }
                        });
                    }
                    select_name_str += name + ",";
                }
            });

            select_name_str = "";
            //处理复选按钮           
            checkboxlist.each(function () {
                var name = $(this).attr("name");
                var idstr_list = name.split('_');
                var id = idstr_list[idstr_list.length - 1];

                if (select_name_str.indexOf(name) == -1) {
                    if (eval("jsondata." + id) != null && eval("jsondata." + id) != undefined) {
                        var arr = $("input[name='" + name + "']");
                        arr.each(function () {
                            var value = $(this).val();
                            var actVal = eval("jsondata." + id);
                            actVal = decodeURIComponent(actVal);
                            if (("," + actVal + ",").indexOf("," + value + ",") >= 0
                                || actVal.toLowerCase() == "true")
                                $(this).prop("checked", "checked");
                            else
                                $(this).prop("checked", "");
                        });
                    }
                    select_name_str += name + ",";
                }
            });
        }
    },
    loadPagingHTML: function (containerid, type, clickfun, sizeinit, sizechange) {
        /// <summary>表单非服务器端分页控件</summary>
        /// <attention>1.此分页只生成需要提交的页数(txt_PageIndex中取值)</attention>
        /// <attention>2.commitAjax提交能自动到后台取值(PageIndex)</attention>
        /// <attention>3.commitAjax提交完必须给(hid_PageTotal,hid_PageSize赋值,span_PageInfo为要记录的分页文本信息)</attention>
        /// <param name="containerId">[必填] 父容器对象</param>
        /// <param name="type">[可空] 页面存在多个表单时使用 asub对应的值为:type_(text,select,radio,checkbox,submit,span)</param>
        /// <param name="clickfun">[可空] 分页提交执行方法</param>

        type = (type == "" || type == null || type == undefined) ? "" : type + "_";
        var pageupid = "a_" + type + "PageUp", pagedownid = "a_" + type + "PageDown", pageindexid = "txt_" + type + "PageIndex", pageinfoid = "span_" + type + "PageInfo",
            pagetotalid = "hid_" + type + "PageTotal", pageredirectid = "btn_" + type + "Redirect", pagesizeid = "sel_" + type + "PageSize";
        var html = "<input type=\"hidden\" id=" + pagetotalid + " value=\"0\" asub=\"" + type + "text\" />";
        html += "<select id=" + pagesizeid + " asub=\"" + type + "select\">" + commFunction.loadPagingPageSizeInfo(sizeinit, sizechange) + "</select>&nbsp;";
        html += "<a id=" + pageupid + " style=\"cursor: pointer;\" onclick=\"commFunction.loadPagingUpOrDown(-1,'" + pageindexid + "', '" + pageinfoid + "', '" + pagetotalid + "', '" + pagesizeid + "', '" + pageredirectid + "')\">上页</a>&nbsp;";
        html += "<a id=" + pagedownid + " style=\"cursor: pointer; \" onclick=\"commFunction.loadPagingUpOrDown(1,'" + pageindexid + "', '" + pageinfoid + "', '" + pagetotalid + "', '" + pagesizeid + "', '" + pageredirectid + "')\" >下页</a>&nbsp;";
        html += "<input id=" + pageindexid + " type=\"text\" asub=\"" + type + "text\" style=\"width: 30px;\" value=\"1\" onkeyup=\"commFunction.loadPagingCheckPageInfo('" + pageindexid + "', '" + pagetotalid + "', '" + pagesizeid + "')\" onkeydown=\"commFunction.loadPagingKeyPress('" + pageredirectid + "',this)\" />&nbsp;";
        html += "<input type=\"button\"  class=\"btn btn-warning\" style=\"height:20px;padding-top:0px;\" value=\"跳转\" id=" + pageredirectid + " />&nbsp;";
        html += "<span id=" + pageinfoid + " asub=\"" + type + "span\"></span>";

        $("#" + containerid).html(html);
        $("#" + pageredirectid).bind("click", clickfun);
    },
    loadPagingPageSizeInfo: function (sizeinit, sizechange) {
        sizeinit = sizeinit == "" ? 20 : parseInt(sizeinit);
        sizechange = sizechange == "" ? 20 : parseInt(sizechange);
        var sizeinfo = "";
        for (var i = 0; i < 3; i++)
            sizeinfo += "<option>" + (20 + (i * sizechange)) + "</option>";

        return sizeinfo;
    },
    loadPagingKeyPress: function (pageredirectid, obj) {
        var event = arguments.callee.caller.arguments[0] || window.event;      //浏览器差异 

        var keycode = (event.keyCode ? event.keyCode : event.which);
        var index = $(obj).val();
        if (keycode == "13") {
            $("#" + pageredirectid).click();
            commFunction.preventDefault();
        }
        else if (keycode == "38") {
            index = parseInt(index) - 1;
            index = index < 1 ? 1 : index;
            $(obj).val(index);
        }
        else if (keycode == "40") {
            index = parseInt(index) + 1;
            $(obj).val(index);
        }
    },
    loadPagingUpOrDown: function (cul, pageindexid, pageinfoid, pagetotalid, pagesizeid, pagerecdictid) {
        var pageindex = $("#" + pageindexid).val();
        var index = parseInt(pageindex) + cul;
        $("#" + pageindexid).val(index);
        var error = commFunction.loadPagingCheckPageInfo(pageindexid, pagetotalid, pagesizeid);
        if (error == "")
            $("#" + pagerecdictid).click();
        else
            $("#" + pageinfoid).html(error);
    },
    loadPagingCheckPageInfo: function (pageindexid, pagetotalid, pagesizeid) {
        var error = "";
        var pageindex = $("#" + pageindexid).val(), pagetotal = $("#" + pagetotalid).val(), pagesize = $("#" + pagesizeid).val();
        var pattern = /^([0-9]{1,})$/;
        if (pattern.test(pageindex)) {
            pagetotal = pattern.test(pagetotal) ? pagetotal : "0";
            pagesize = pattern.test(pagesize) ? pagesize : "1";
            var max = parseInt(parseInt(pagetotal) / parseInt(pagesize));
            max = (parseInt(pagetotal) / parseInt(pagesize)) > max ? max + 1 : max;
            if (parseInt(pageindex) > max)
                pageindex = max.toString();
            pageindex = pageindex == "0" ? "1" : pageindex;
        }
        else {
            error = "输入格式不正确!";
            pageindex = "1";
        }
        $("#" + pageindexid).val(pageindex);

        return error;
    },
    loadFormDetailHTML: function (containerid, headtitle, jsondata, tableclass, closefunname) {
        /// <summary>详情页面</summary>
        /// <param name="containerid">[必填] 父容器对象</param>
        /// <param name="headtitle">[可空] 详情头部标题(非页面title)</param>
        /// <param name="jsondata">[必填] json数据格式 例:{FildName_a:['ShowName_a','Value'],FildName_b:['ShowName_b','Value']}</param>
        /// <param name="tableclass">[可空] table样式</param>

        if (typeof jsondata == "string")
            jsondata = eval('(' + decodeURIComponent(jsondata) + ')');
        if (typeof jsondata == "object") {
            var count = 1;
            var html = "<table width=\"100%\" style=\"border-collapse: collapse;\" " + (tableclass != "" ? "class='" + tableclass + "'" : "") + " border=\"1\" cellspacing=\"0\">";
            html += "<tr><td colspan=\"4\" align=\"center\" style=\"background: #ECECEC; padding: 0px; height: 30px\"><br /><h3>" + (headtitle != "" ? headtitle : "详情") + "</h3></td></tr>";
            $.each(jsondata, function (name, value) {
                if (count == 1) {
                    html += "<tr><td width=\"15%\" height=\"35\" align=\"right\">" + value[0] + "：&nbsp;&nbsp;</td><td width=\"35%\"><span id=\"span_" + name + "\">" + value[1] + "</span></td>";
                    count = 2;
                }
                else {
                    html += "<td width=\"15%\" height=\"35\" align=\"right\">" + value[0] + "：&nbsp;&nbsp;</td><td width=\"35%\"><span id=\"span_" + name + "\">" + value[1] + "</span></td></tr>";
                    count = 1;
                }
            });
            if (count == 2) {
                html += "<td colspan='2'></td></tr>";
            }
            html += "<tr><td colspan='4' height=\"35\"></td></tr>";
            html += "<tr><td colspan='4' height=\"35\" align=\"center\"><input type=\"button\" value=\"关 闭\" onclick=\"" + (closefunname ? closefunname : "javascript:window.close();") + "\" /></td></tr>";
            html += "</table>";
            $("#" + containerid).html(html);
        }
    },
    loadFormDataHTML: function (containerid, masterid, jsondata, tableheadhtml, tableclass, tablestyle) {
        this.loadFormDataHTMLObj({
            containerId: containerid,
            masterId: masterid,
            jsonData: jsondata,
            tableHeadHtml: tableheadhtml,
            tableClass: tableclass,
            tableStyle: tablestyle
        });
    },
    loadFormCommitHTML: function (containerid, jsondata) {
        /// <summary>提交表单生成</summary>
        /// <attention>1.HTML中要赋值的字段格式:{字段A} 例:<td>{字段A}</td></attention>
        /// <param name="containerid">[必填] 父容器对象</param> 
        /// <param name="jsondata">[必填] 此数据是个二维数组,5组数据 例:[['Cols','']['AjaxType','']['LoadPaging','']['TabClass','']['DataInfo','']]</param>
        /// <param name="jsondata">Cols:值为表单需要的列的数量,例:2,一个值为一列,默认:2  [可空]</param>
        /// <param name="jsondata">AjaxType:异步类型(防止多表单重复) 为asub='type_',为commitAjax方法传入的第二个字段  [可空]</param>
        /// <param name="jsondata">LoadPaging:分页信息 值:是或否,默认:是,方法不加载(因为提交按钮的方法需要自己实现),必须调用完此方法后,执行下面代码即可:commFunction.loadPagingHTML("td_"+AjaxType+"_paging", 按钮的方法的方法名); [可空]</param>
        /// <param name="jsondata">TabClass:Table的样式 [可空]</param>
        /// <param name="jsondata">DataInfo:表单数据 格式：[{Type:'',ShowName:'',ID:'',HintName:'',Important:'',Data:[{Name:'',Value:''}]}]    [必填]</param>
        /// <param name="jsondata">DataInfo > Type:生成控件类型支持(text,textarea,radio,checkbox,select,hidden)</param>
        /// <param name="jsondata">DataInfo > ShowName:控件显示名字</param>
        /// <param name="jsondata">DataInfo > ID:控件ID,(txt_ID,rad_ID,chk_ID,sel_ID)</param>
        /// <param name="jsondata">DataInfo > Data:(text,textarea控件无需传data)</param>
        /// <param name="jsondata">DataInfo > Data >  Name:选择项的显示名字</param>
        /// <param name="jsondata">DataInfo > Data >  Value:选择项的对应值</param>

        var Cols = "", DataInfo = "", LoadPaging = "是", TabClass = "", AjaxType = "";
        for (var i = 0; i < jsondata.length; i++) {
            var key = jsondata[i][0];
            var value = jsondata[i][1];
            key == "Cols" && (Cols = value);
            key == "DataInfo" && (DataInfo = value);
            key == "LoadPaging" && (LoadPaging = value);
            key == "TabClass" && (TabClass = value);
            key == "AjaxType" && (AjaxType = value);
        }

        AjaxType = AjaxType == "" ? "" : AjaxType + "_";
        TabClass = TabClass == "" ? "" : ("class=\"" + TabClass + "\"");
        Cols = Cols == "" ? 2 : parseInt(Cols);
        Cols = Cols < 1 ? 1 : Cols > 4 ? 4 : Cols;

        var param = eval("([" + DataInfo + "])");

        var html = "<table " + TabClass + " style=\"width:100%;\">";

        var count = 1;
        $.each(param, function () {
            var currHTML = "";
            var perid = this.ID;
            if (count == 1)
                currHTML += "<tr>";
            currHTML += "<td id=\"td_" + AjaxType + perid + "\">" + this.ShowName + ":</td>";
            currHTML += "<td>";
            var hintname = this.HintName ? this.HintName : "";
            var asub = (this.Asub && this.Asub == "1") ? "asub=\"" + AjaxType + (this.Type.toLowerCase() == "hidden" ? "text" : this.Type.toLowerCase()) + "\"" : "";
            var regexType = this.RegexType ? "RegexType=\"" + this.RegexType + "\"" : "";
            var validator = this.RegexType ? "Validator" : "";
            var errorMsg = this.ErrorMsg ? "ErrorMsg=\"" + this.ErrorMsg + "\"" : "";
            if (this.Type.toLowerCase() == "text") {
                var txt_type = "text";
                if (perid.toLowerCase().indexOf("passwoed") >= 0 || perid.toLowerCase().indexOf("pwd") >= 0)
                    txt_type = "password";
                else if (this.ShowName.indexOf("密码") >= 0)
                    txt_type = "password";
                currHTML += "<input type=\"" + txt_type + "\" " + asub + " value=\"\" id=\"txt_" + AjaxType + perid + "\" placeholder=\"" + hintname + "\" class=\"form-control " + validator + "\" " + regexType + errorMsg + " style='float:left;' />";
            }
            else if (this.Type == "textarea")
                currHTML += "<textarea " + asub + " id=\"txt_" + AjaxType + perid + "\" cols=\"40\" rows=\"6\" placeholder=\"" + hintname + "\" class=\"form-control " + validator + "\" " + regexType + errorMsg + " ></textarea>";
            else if (this.Type.toLowerCase() == "select") {
                currHTML += "<select id=\"sel_" + AjaxType + perid + "\" " + asub + " class=\"form-control " + validator + "\" " + regexType + errorMsg + " >";
                var d_check = "selected='selected'";
                $.each(this.Data, function () {
                    currHTML += "<option value=\"" + this.Value + "\" " + d_check + ">" + this.Name + "</option>";
                    d_check = "";
                })
                currHTML += "</select>";
            }
            else if (this.Type.toLowerCase() == "radio") {
                var d_check = "checked='checked'";
                $.each(this.Data, function () {
                    currHTML += "<label class=\"radio-inline\">";
                    currHTML += "<input type=\"radio\" name=\"rad_" + AjaxType + perid + "\" " + d_check + " " + asub + " value=\"" + this.Value + "\" />" + this.Name;
                    currHTML += "</label>";
                    d_check = "";
                })
            }
            else if (this.Type.toLowerCase() == "checkbox") {
                $.each(this.Data, function () {
                    currHTML += "<label class=\"checkbox-inline\">";
                    currHTML += "<input type=\"checkbox\" name=\"chk_" + AjaxType + perid + "\" " + asub + " value=\"" + this.Value + "\" />" + this.Name;
                    currHTML += "</label>";
                })
            }

            if (this.Important && this.Important == "1")
                currHTML += "&nbsp;<span style=\"color:red;line-height:35px;\">*</span>";

            currHTML += "</td>";

            if (this.Type.toLowerCase() == "hidden") {
                currHTML = "<input type=\"hidden\" " + asub + " value=\"\" id=\"hid_" + AjaxType + perid + "\" />";
                var trim = html.length > 4 ? html.substring(html.length - 5, html.length) : "";
                if (trim.toLowerCase() == "</td>")
                    html = html.substring(0, html.length - 5) + currHTML + "</td>";
                else if (trim.toLowerCase() == "</tr>")
                    html = html.substring(0, html.length - 10) + currHTML + "</td></tr>";
            }
            else {
                if (count == Cols) {
                    currHTML += "</tr>";
                    count = 1;
                }
                else
                    count++;

                html += currHTML;
            }
        });

        if (count != 1) {
            for (var i = 0; i < (Cols + 1 - count) ; i++) {
                if (i == 0 && LoadPaging == "是")
                    html += "<td>分页信息:</td><td id='td_" + AjaxType + "paging'></td>";
                else
                    html += "<td></td><td></td>";
            }
            html += "</tr>";
        }
        else {
            if (LoadPaging == "是") {
                html += "<tr>";
                for (var i = 0; i < Cols ; i++) {
                    if (i == 0)
                        html += "<td>分页信息:</td><td id='td_" + AjaxType + "paging'></td>";
                    else
                        html += "<td></td><td></td>";
                }
                html += "</tr>";
            }
        }

        html += "<tr>";
        html += "<td colspan=\"" + (Cols * 2) + "\" style=\"text-align: center;\">";
        html += "<input type=\"button\" asub=\"" + AjaxType + "submit\" value=\"提 交\" id=\"btn_" + AjaxType + "tijiao\" class=\"btn btn-default btn-sm\" />";
        html += "</td>";
        html += "</tr>";

        html += "</table>";

        $("#" + containerid).html(html);
        return html;
    },
    preventDefault: function (event) {
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
            window.event.returnValue = false;
        } else {
            event.preventDefault();
        }
    },
    loadSupplierNOInfo: function (val, successfun, errorfun, completefun, json) {
        if (typeof val == "string")
            val = eval('(' + val + ')');
        if (typeof json == "string")
            json = eval('(' + json + ')');

        $.ajax({
            type: "GET"
                , url: "/included/GetSupplierData.aspx"
                , data: val
                , contentType: "application/json; charset=utf-8"
                , dataType: "text"
                , success: function (msg) {
                    successfun && successfun(msg);
                    (json && json.ShowId && json.HideId) && $("#" + json.ShowId).jDropDownList({ dataSource: msg, hiddenObj: $("#" + json.HideId), defaultItem: "[{ Text: '--请选择--', Value: '-1'}]", maxItem: 15, selectBy: "Text,Value,SelectBy" });
                }
                , error: function (msg) {
                    errorfun && errorfun(msg);
                    !errorfun && alert("操作处理异常!" + msg.status + "|" + msg.statusText);
                }
                , complete: function () {
                    completefun && completefun();
                }
        });

    },
    commitAjaxObj: function (jsonObj) {
        var obj, type, requrl, getparamfun, successfun, errorfun, completefun, pageValidator, ajaxParam;
        obj = jsonObj.obj;
        type = jsonObj.type;
        requrl = jsonObj.reqUrl;
        getparamfun = jsonObj.getParamFun;
        successfun = jsonObj.successFun;
        errorfun = jsonObj.errorFun;
        completefun = jsonObj.completeFun;
        pageValidator = jsonObj.pageValidator;
        ajaxParam = jsonObj.ajaxParam;

        /// <summary>表单ajax提交事件(新)</summary>
        /// <attention>1.此方法仅支持input和select,radio,checkbox,textarea,span控件</attention>
        /// <attention>2.此方法实现了jButtonLoading方法,所以页面可以引用脚本(jSubmitLoading.js),无引用不实现按钮ajax期间 禁用功能</attention>
        /// <attention>3.控件必须带有属性asub,对应的值为(text,select,radio,checkbox,submit)等</attention>
        /// <attention>4.如需验证控件,需要加载PageValidator.js文件</attention>
        /// <param name="jsonObj">json对象 字段在下面</param>
        /// <param name="obj">[可空] 防止按钮重复提交,值为提交按钮的对象.空则取asub='submit'的对象</param>
        /// <param name="type">[可空] 页面存在多种表单提交时使用 asub对应的值为:type_(text,select,radio,checkbox,submit) type随意设置</param>
        /// <param name="reqUrl">[可空] ajax提交地址,空的时候不执行ajax</param>
        /// <param name="getParamFun">[可空] 获取页面全部提交参数后执行的方法,此方法只有唯一参数:二维数组 例:[[a,b][c,d]]</param>
        /// <param name="successFun">[可空] ajax执行成功后,执行的方法,此方法只有唯一参数:字符串(后台传出的字符串)</param>
        /// <param name="errorFun">[可空] ajax错误时执行的方法,此方法只有唯一参数:msg对象,默认alert(错误信息)</param>
        /// <param name="completeFun">[可空] ajax执行完成调用的方法</param>
        /// <param name="pageValidator">[可空] 提交时是否调用页面验证函数：1是 0否</param>
        /// <param name="ajaxParam">[可空] 提交时,需要追加提交到后台的数据json格式,例:{a:'1'}</param>

        type = (type == "" || type == null || type == undefined) ? "" : type + "_";
        //提交按钮
        if (obj == null || obj == undefined) {
            obj = $("input[asub='" + type + "submit']");
            obj = !obj.length ? null : obj;
        }
        //表单txt输入控件
        var inputlist = $("input[asub='" + type + "text']");
        //表单textarea控件
        var textarealist = $("textarea[asub='" + type + "textarea']");
        //表单下拉框控件
        var selectlist = $("select[asub='" + type + "select']");
        //表单单选控件
        var radiolist = $("input[asub='" + type + "radio']");
        //表单复选控件
        var checkboxlist = $("input[asub='" + type + "checkbox']");
        //表单span控件(只获取html)
        var spanlist = $("input[asub='" + type + "span']");

        //select_json数组key为字段名  value值
        var all_param_json = [];

        //处理txt输入控件
        inputlist.each(function () {
            var id = $(this).attr("id");
            !id && (id = $(this).attr("name"));
            var idstr_list = id.split('_');
            id = idstr_list[idstr_list.length - 1];
            var value = $(this).val();
            if (id == "PageIndex" && value == "")
                value = 1;
            all_param_json.push([id, value]);
        });

        //处理textarea输入控件
        textarealist.each(function () {
            var id = $(this).attr("id");
            !id && (id = $(this).attr("name"));
            var idstr_list = id.split('_');
            id = idstr_list[idstr_list.length - 1];
            var value = $(this).val();
            all_param_json.push([id, value]);
        });

        //处理下拉框控件
        selectlist.each(function () {
            var id = $(this).attr("id");
            !id && (id = $(this).attr("name"));
            var idstr_list = id.split('_');
            id = idstr_list[idstr_list.length - 1];
            var value = $(this).val();
            all_param_json.push([id, value]);
        });

        var select_name_str = "";
        //处理单选按钮           
        radiolist.each(function () {
            var name = $(this).attr("name");
            var orlgroupname = "", groupname = "";
            if ($(this).attr("groupname"))
                orlgroupname = groupname = $(this).attr("groupname");
            var idstr_list = name.split('_');
            var id = idstr_list[idstr_list.length - 1];
            if (groupname) {
                var groupname_list = groupname.split('_');
                groupname = groupname_list[groupname_list.length - 1];
            }


            if (select_name_str.indexOf(name) == -1) {
                var arr = $("input[name='" + name + "']:checked");
                var value = "";
                if (arr.length == 0)
                    value = "";
                else
                    value = $(arr).val();

                all_param_json.push([groupname ? groupname : id, value]);
                select_name_str += name + ",";
            }
        });

        select_name_str = "";
        //处理复选按钮           
        checkboxlist.each(function () {
            var name = $(this).attr("name");
            var idstr_list = name.split('_');
            var id = idstr_list[idstr_list.length - 1];
            var length = $("input[name='" + name + "']").length;
            if (select_name_str.indexOf(name) == -1) {
                var arr = $("input[name='" + name + "']" + (length == 1 ? "" : ":checked"));
                var value = "";
                if (arr.length == 0)
                    value = "";
                else {
                    arr.each(function () {
                        var actVal = $(this).val();
                        if (length == 1) {
                            actVal = $(this).prop("checked") ? actVal : "0";
                            actVal = actVal == "on" ? "1" : actVal;
                        }
                        else {
                            actVal += ",";
                        }
                        value += actVal;
                    });
                }
                all_param_json.push([id, value.replace(/,$/gi, "")]);
                select_name_str += name + ",";
            }
        });

        //处理span控件
        spanlist.each(function () {
            var id = $(this).attr("id");
            !id && (id = $(this).attr("name"));
            var idstr_list = id.split('_');
            id = idstr_list[idstr_list.length - 1];
            var value = $(this).html();
            all_param_json.push([id, value]);
        });

        //调用页面验证
        if (pageValidator) {
            var result = exValidator('');
            if (!result)
                return false;
        }

        //调用外部方法
        if (getparamfun != null && getparamfun != undefined) {
            var error = getparamfun(all_param_json);
            if (error != undefined && error != "" && error != null)
                return false;
        }

        //添加数据
        if (ajaxParam) {
            if (typeof ajaxParam == "string")
                ajaxParam = eval('(' + ajaxParam + ')');
            for (var key in ajaxParam)
                all_param_json.push([key, ajaxParam[key]]);
        }

        //ajax回传数据 格式json(所有参数经过encode)
        var ajaxdata = commFunction.getParamFormData(all_param_json);

        if (requrl != "") {
            try {
                (obj && $(obj).jButtonLoading != undefined) && $(obj).jButtonLoading({ loadingFormatText: "" });
            } catch (e) {
            }

            var url_datatype = requrl.indexOf("aspx") > -1 ? "json" : "html";
            var url_reqtype = requrl.indexOf("aspx") > -1 ? "POST" : "GET";

            $.ajax({
                type: url_reqtype
                    , url: requrl
                    , data: ajaxdata
                    , contentType: "application/json; charset=utf-8"
                    , dataType: url_datatype
                    , success: function (msg) {
                        if (successfun != null && successfun != undefined)
                            successfun(msg);
                    }
                    , error: function (msg) {
                        if (errorfun != null && errorfun != undefined)
                            errorfun(msg);
                        else
                            alert("操作处理异常!" + msg.status + "|" + msg.statusText);
                    }
                    , complete: function () {
                        try {
                            (obj && $(obj).jButtonReset != undefined) && $(obj).jButtonReset();
                        } catch (e) {
                        }
                        if (completefun != null && completefun != undefined)
                            completefun();
                    }
            })
        }
    },
    loadFormDataHTMLObj: function (jsonObj) {
        var containerid, masterid, jsondata, tableheadhtml, tableclass, tablestyle;
        containerid = jsonObj.containerId;
        masterid = jsonObj.masterId;
        jsondata = jsonObj.jsonData;
        tableheadhtml = jsonObj.tableHeadHtml;
        tableclass = jsonObj.tableClass;
        tablestyle = jsonObj.tableStyle;

        /// <summary>列表模版加载</summary>
        /// <attention>1.HTML中要赋值的字段格式:{字段A} 例:<td>{字段A}</td></attention>
        /// <attention>2.UniqueNO字段,每行自带UniqueNO序列号，从1开始(第一行为1，第二行为2).页面可以直接使用{UniqueNO},无需后台赋值</attention>
        /// <attention>3.{this} 页面支持this 为本行json数据转字符串后，再经过decodeURIComponent的数据</attention>
        /// <attention>4.模版支持eval函数,格式{eval:XXXX:eval} XXXX为eval的内容.(可写三元表达式,也可直接调用页面函数)  例:{eval:TranStatus('{字段A}')=='666'?'1':'2':eval}</attention>
        /// <attention>5.模版支持for函数,格式{for 字段A}XXXX{/for 字段A} jsondata.字段A为数据源   XXXX为HTML代码;   只支持一层的for循环，不能嵌套</attention>
        /// <param name="containerid">[必填] 列表HTML容器ID</param> 
        /// <param name="masterid">[必填] 模版容器ID</param> 
        /// <param name="jsondata">[必填] json数据格式 例:[{'普通双程':'1','Remark':'2','特殊单程':'3'},{'普通_双程':'4','Remark':'5','特殊单程':'6'}]  字段不区分大小写</param>     
        /// <param name="tableheadhtml">[选填] 列表表头HTML代码</param>
        /// <param name="tableclass">[选填] table class样式</param>
        /// <param name="tablestyle">[选填] table style样式添加</param>

        if (typeof jsondata == "string" && jsondata) {
            jsondata = jsondata.replace(/\+/g, '%20');
            try {
                jsondata = eval('(' + decodeURIComponent(jsondata) + ')');
            } catch (e) {
                jsondata = eval('(' + jsondata + ')');
            }
        }
        if (typeof jsondata == "object") {
            var orlhtml = $("#" + masterid).html();
            orlhtml = orlhtml.replace(/<table>/ig, "").replace(/<\/table>/ig, "");
            var resulthtml = "";
            var regex = new RegExp("{([\\s\\S]*?)}", 'g');
            var eval_regex = new RegExp("{eval:([\\s\\S]*?):eval}", 'ig');
            //暂时只支持td
            //var cutstr_regex = new RegExp("<td>{([\\s\\S]*?)}</td>", 'g');
            //for循环
            var for_regex = new RegExp("{for([\\s]{0,})([a-zA-Z0-9_.]*?)}", 'ig');
            //默认序号
            var numberName = "UniqueNO";
            var no = 1;

            $.each(jsondata, function () {
                var copyhtml = orlhtml;
                var itemStr = JSON.stringify(this);
                try {
                    itemStr = decodeURIComponent(itemStr);
                } catch (e) {
                }
                itemStr = encodeURIComponent(itemStr);
                //获取tr
                var tr_reg = /^<tr([\s\S]*?)>$/;

                //替换this
                copyhtml = copyhtml.replace(eval("/\{this\}/ig"), itemStr);
                //替换默认序号
                copyhtml = copyhtml.replace(eval("/\{" + numberName + "\}/ig"), no++);
                //替换数组数据
                $.each(this, function (key, value) {
                    try {
                        value = decodeURIComponent(value);
                    } catch (e) {

                    }
                    value = value.replace("{", "%7b").replace("}", "%7d");
                    copyhtml = copyhtml.replace(eval("/\{" + key + "\}/ig"), value);
                });
                //替换for循环
                var for_list = copyhtml.match(for_regex);
                for_list &&
                $.each(for_list, function () {
                    try {
                        var for_res = this.replace("{for", "").replace("}", "").replace(/(^\s*)|(\s*$)/g, "");
                        var single_regex = new RegExp("{for([\\s]{0,})" + for_res + "}([\\s\\S]*?){/for([\\s]{0,})" + for_res + "}", 'ig');
                        !single_regex.test(copyhtml) && (single_regex = new RegExp("{for([\\s]{0,})" + for_res + "}([\\s\\S]*?){/for}", 'ig'));

                        var single_obj, orl_for_singlehtml = '', for_single_html = "", for_total_html = "";
                        single_regex.test(copyhtml) && (
                        orl_for_singlehtml = copyhtml.match(single_regex),
                        single_obj = eval("jsondata." + for_res),
                        single_obj = typeof jsondata == "string" ? eval(decodeURIComponent(value)) : single_obj,

                        for_single_html = orl_for_singlehtml.replace(eval("/(^" + this + ")/"), "")
                                                            .replace(eval("/({/for([\\s]{0,})" + for_res + "}$)/"), "")
                                                            .replace(eval("/({/for}$)/"), ""),
                        //替换数组数据
                        $.each(single_obj, function () {
                            var copy_for_single_html = for_single_html;

                            //替换单个数组数据
                            $.each(this, function (key, value) {
                                try {
                                    value = decodeURIComponent(value);
                                } catch (e) { }
                                value = value.replace("{", "%7b").replace("}", "%7d");
                                copy_for_single_html = copy_for_single_html.replace(eval("/\{" + key + "\}/ig"), value);
                            });

                            for_total_html += copy_for_single_html;
                        }),

                        copyhtml = copyhtml.replace(copyhtml.match(single_regex).toString(), for_total_html),
                        true);

                    } catch (e) {
                    }
                });

                //替换eval表达式
                var eval_list = copyhtml.match(eval_regex);
                eval_list &&
                $.each(eval_list, function () {
                    try {
                        var eval_res = eval(this.replace(/{eval:/, "").replace(/:eval}/, ""));
                        copyhtml = copyhtml.replace(this, eval_res);
                    } catch (e) {
                    }
                });

                //替换剩余的{}
                var result;
                do {
                    result = regex.exec(copyhtml);
                    if (result != null) {
                        try {
                            eval("(" + decodeURIComponent(result[0]) + ")");
                            continue;
                        } catch (e) {

                        }
                        try {
                            copyhtml = copyhtml.replace(eval("/\{" + result[1] + "\}/ig"), "");
                        } catch (e) {
                        }
                    }
                } while (result != null);

                resulthtml += copyhtml;
            });
            if (tableheadhtml != undefined && tableheadhtml != null && tableheadhtml != "")
                resulthtml = tableheadhtml + resulthtml;

            tableclass = tableclass ? tableclass : "detailstable";
            $("#" + containerid).html("<table class=\"" + tableclass + "\" width=\"100%\" id=\"tab_master\" style=\"" + tablestyle + "\" >" + resulthtml + "</table>");

            $("#" + containerid).css("display", "block");
        }
        else
            $("#" + containerid).html("");
    },
    getQueryVariable: function (variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) { return pair[1]; }
        }
        return (false);
    }
};