/* 
 * The MIT License
 *
 * Copyright 2014 Long.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var IllDownData = function(db, user, pwd, filename){
    var queryString = $.param({'user':user, 'pwd': pwd, 'filename': filename});
    $.ajax({
        url: 'https://acoustic.ifp.uiuc.edu:8081/gridfs/'+db+'/data?'+queryString,
        method:'GET', 
        success:function(data,status){
            console.log(status);
            console.log(data[1]+data[2]+data[3]+data[4]);
        },
        error:function(){
            alert('Error');
        },
        timeOut: 10000,
        async: false
    });
};

var IllDownEvent = function(db, user, pwd, filename){
    var ret;
    var queryString = $.param({'dbname':db, 'colname':'event', 'user':user, 'pwd': pwd});
    $.ajax({
        url: 'https://acoustic.ifp.uiuc.edu:8081/query?'+queryString,
        data: '{filename:"'+filename+'"}',
        method:'POST', 
        success:function(data, status){
            console.log(status);
            ret = JSON.parse(data);
        },
        timeOut: 10000,
        async: false
    });
    return ret;
};

var IllTimeQuery = function (db, user, pwd, varargin){
    var ret;
    
    //var tZoneOffset = 5/24;
    
    if (Object.keys(varargin).length <= 1){
        var queryString = $.param({'dbname':db, 'colname': 'data.files', 'user': user, 'passwd': pwd});
        $.ajax({
            url: 'https://acoustic.ifp.uiuc.edu:8081/query?'+queryString,
            data: '{uploadDate:{$gte:{$date:"' + varargin.time1 + 'Z"}}}',
            method:'POST', 
            success:function(data, status){
                console.log(status);
                ret = JSON.parse(data);
            },
            timeOut: 10000,
            async: false
        });
    } else{
        if (varargin.hasOwnProperty('limit')){
            var queryString = $.param({'dbname':db, 'colname': 'data.files', 'user': user, 'passwd': pwd, 'limit':varargin.limit});
            $.ajax({
                url: 'https://acoustic.ifp.uiuc.edu:8081/query?'+queryString,
                data: '{uploadDate:{$gte:{$date:"' + varargin.time1 + 'Z"}}}',
                method:'POST', 
                success:function(data, status){
                    console.log(status);
                    ret = JSON.parse(data);
                },
                timeOut: 10000
            });
        } else if(varargin.hasOwnProperty('time2')) {
            var queryString = $.param({'dbname':db, 'colname': 'data.files', 'user': user, 'passwd': pwd});
            $.ajax({
                url: 'https://acoustic.ifp.uiuc.edu:8081/query?'+queryString,
                data: '{uploadDate:{$gte:{$date:"' + varargin.time1 + 'Z"}, $lte:{$date:"' + varargin.time2 + 'Z"}}}',
                method:'POST', 
                success:function(data, status){
                    console.log(status);
                    ret = JSON.parse(data);
                },
                timeOut: 10000,
                async: false
            });
        }
    }
    return ret;
};