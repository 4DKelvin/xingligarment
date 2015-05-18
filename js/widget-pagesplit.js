// JavaScript Document
function PageSplit(options){
	this.form = options['form'];
	this.baseUrl = options['url'];
	this.param = options['param'];
	this.rowcount = options['rowcount'];
	this.linenum = options['linenum'];
	this.pageindex = options['pageindex'];
	this.columns = options['columns'] != null ? options['columns'] : 5;
	this.renderTo = function(selector){
		if(this.rowcount<=this.linenum)return;
		var pagecount =  parseInt(this.rowcount % this.linenum != 0 ? 
									this.rowcount / this.linenum + 1 :
									this.rowcount / this.linenum);
		var index = this.pageindex > parseInt(pagecount) ?  
									parseInt(pagecount) :									
									parseInt(this.pageindex);
		var num = parseInt(this.columns / 2);
		var url = this.baseUrl;		
		var ulNav = $('<ul/>').attr('class','pagesplit');				
		if(index > num + 1)
		{
			if(this.form)
			{
				$('<li/>').attr('rel',this.form).click(this.onPager).html('1').appendTo(ulNav);
			}
			else
			{
				$('<li/>').attr('url',url).click(this.onPager).html('1').appendTo(ulNav);
			}
			if(this.pageindex - num > num)
				$('<li/>').html('...').appendTo(ulNav);
		}
		for(var i = index - num; i <= index + num; i++)
		{

			if(i >= 1 && i <= pagecount) 
			{
				if(this.form)
				{
					$('<li/>').attr({'rel':this.form,'class':(i == this.pageindex ? 'current' :'')})
						  .click(this.onPager)
						  .html(i)
						  .appendTo(ulNav);
				}
				else
				{
					$('<li/>').attr({'url':url,'class':(i == this.pageindex ? 'current' :'')})
					  .click(this.onPager)
					  .html(i)
					  .appendTo(ulNav);
				}
			}			
		}
		if(index < pagecount - num)
		{
			if(this.pageindex + num < pagecount - 1)
				$('<li/>').html('...').appendTo(ulNav);
			$('<li/>').attr('rel',this.form).click(this.onPager).html(pagecount).appendTo(ulNav);
		}
		ulNav.appendTo($('#'+ selector));
	}
	this.onPager = function(){
		if($(this).attr('rel'))
		{
			$('#'+$(this).attr('rel')).append($('<input type="hidden" name="pageIndex" value="'+$(this).html()+'"/>')).submit();
		}
		else
		{
			var url = $(this).attr('url');
			url +=url.indexOf("?")<0?"?" :"";
			
			window.location.href =url+="&pageIndex=" + $(this).html();
		}
	}
}
