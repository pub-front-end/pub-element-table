//回车（换行符）转为br标签
function return2Br(str) {
    return str.replace(/\r?\n/g,"<br/>");
}
//空格转为转义字符
function space2html(str) {
    return str.replace(/\s/g,"&nbsp;");
}
//将html标签转为转义字符
function html2string(sHtml) {
    return sHtml.replace(/[<>&"]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c];});
}

//将字符串按格式原样输出。其中的html字符也会原样输出。
function escapeHtml(s){
    return space2html(return2Br(html2string(s)));
}

module.exports = {
    escapeHtml
};
