function randomDemo() {
	$(document).ready(function() {
		var text = $("#tags").find('a[class="tag-txt"]');
		text.each(function() {
			var x = 1;
			var y = 0;
			var rand = parseInt(Math.random() * (x - y + 1) + y);
			$(this).addClass("random-text" + rand);
		});
	});
}

randomDemo();