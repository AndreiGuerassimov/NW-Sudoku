var puzzleComplete = {
	sqr1a: 5,sqr1b: 3,sqr1c: 4,sqr1d: 6,sqr1e: 7,sqr1f: 2,sqr1g: 1,sqr1h: 9,sqr1i: 8,
	sqr2a: 6,sqr2b: 7,sqr2c: 8,sqr2d: 1,sqr2e: 9,sqr2f: 5,sqr2g: 3,sqr2h: 4,sqr2i: 2,
	sqr3a: 9,sqr3b: 1,sqr3c: 2,sqr3d: 3,sqr3e: 4,sqr3f: 8,sqr3g: 5,sqr3h: 6,sqr3i: 7,
	sqr4a: 8,sqr4b: 5,sqr4c: 9,sqr4d: 4,sqr4e: 2,sqr4f: 6,sqr4g: 7,sqr4h: 1,sqr4i: 3,
	sqr5a: 7,sqr5b: 6,sqr5c: 1,sqr5d: 8,sqr5e: 5,sqr5f: 3,sqr5g: 9,sqr5h: 2,sqr5i: 4,
	sqr6a: 4,sqr6b: 2,sqr6c: 3,sqr6d: 7,sqr6e: 9,sqr6f: 1,sqr6g: 8,sqr6h: 5,sqr6i: 6,
	sqr7a: 9,sqr7b: 6,sqr7c: 1,sqr7d: 2,sqr7e: 8,sqr7f: 7,sqr7g: 3,sqr7h: 4,sqr7i: 5,
	sqr8a: 5,sqr8b: 3,sqr8c: 7,sqr8d: 4,sqr8e: 1,sqr8f: 9,sqr8g: 2,sqr8h: 8,sqr8i: 6,
	sqr9a: 2,sqr9b: 8,sqr9c: 4,sqr9d: 6,sqr9e: 3,sqr9f: 5,sqr9g: 1,sqr9h: 7,sqr9i: 9
};

var availableHints = [
	'sqr1a','sqr1b','sqr1d','sqr1h','sqr1i',
	'sqr2b','sqr2d','sqr2e','sqr2f',
	'sqr3h',
	'sqr4a','sqr4d','sqr4g',
	'sqr5b','sqr5d','sqr5f','sqr5h',
	'sqr6c','sqr6f','sqr6i',
	'sqr7b',
	'sqr8d','sqr8e','sqr8f','sqr8h',
	'sqr9a','sqr9b','sqr9f','sqr9h','sqr9i',
];

var areAnswersNotEmpty = false;
var isPuzzleSolved = false;
var hasErrors;
var availableQuestionsCount = 0;
var solvedQuestionsCount = 0;

jQuery(document).ready(function() {
	
	// Populate puzzle
	for (var i = 0; i < availableHints.length; i++) {
		jQuery('#' + availableHints[i]).html(puzzleComplete[availableHints[i]]);
		jQuery('#' + availableHints[i]).addClass('hint');
	}
	
	// Add inputs for questions
	jQuery('table.cell-table td').each(function() {
		if (!jQuery(this).hasClass('hint')) {
			jQuery(this).html('<input type="text" class="question-input" maxlength="1">');
			jQuery(this).addClass('question');
			availableQuestionsCount++;
		}
	}); 
	
	// Focus input
	jQuery('.question').click(function() {
		jQuery(this).find('input').focus();
		
		if (jQuery(this).find('input').val() !== '')
			jQuery(this).find('input').select();
	});
	
	// Validate input
	jQuery('.question').change(function() {
		if (isNaN(jQuery(this).find('input').val())) {
			hideAllMessages();
			jQuery('#msg-isNaN').addClass('show-message');
			jQuery(this).find('input').val('');
			
			setTimeout(function(){ 
				jQuery('#msg-isNaN').removeClass('show-message');
			}, 5000);
		}
		
		upadateStatus();
		
		if (areAnswersNotEmpty) {
			jQuery('#ctrl-hint').removeClass('ctrl-disabled');
		} else {
			jQuery('#ctrl-hint').addClass('ctrl-disabled');
			hasErrors = false;
		}
		
		if (solvedQuestionsCount === availableQuestionsCount) {
			hint(true);
		}
	});
});

function reset() {
	jQuery('#ctrl-hint').addClass('ctrl-disabled');
	
	// Clear questions
	jQuery('table.cell-table td').each(function() {
		if (!jQuery(this).hasClass('hint') && jQuery(this).find('input').val() !== '') {
			jQuery(this).find('input').val('');
		}
	}); 
}

function hint(isComplete) {
	
	if (!jQuery('#ctrl-hint').hasClass('ctrl-disabled')) {
	
		hasErrors = false;
		
		// Clear questions
		jQuery('table.cell-table td').each(function() {
			if (!jQuery(this).hasClass('hint') && jQuery(this).find('input').val() !== '') {
				if (puzzleComplete[jQuery(this).attr('id')] == jQuery(this).find('input').val()) {
					jQuery(this).addClass('hint-right');
				} else {
					jQuery(this).addClass('hint-wrong');
					hasErrors = true;
				}
				
				if (isComplete) {
					if (hasErrors) {
						hideAllMessages();
						jQuery('#msg-hasErrors').addClass('show-message');
						
						setTimeout(function(){ 
							jQuery('#msg-hasErrors').removeClass('show-message');
						}, 5000);
					} else {
						hideAllMessages();
						isPuzzleSolved = true;
						jQuery('#msg-puzzleSolved').addClass('show-message');
						return;
					}
				}
				
				// Timeout for clearing hints
				
				setTimeout(function(){ 
					jQuery('table.cell-table td').each(function() {
						if (jQuery(this).hasClass('hint-right'))
							jQuery(this).removeClass('hint-right');
				
						if (jQuery(this).hasClass('hint-wrong'))
							jQuery(this).removeClass('hint-wrong');
					});
				}, 5000);
			}
		}); 
		
		if (areAnswersNotEmpty) {
			jQuery('#ctrl-hint').removeClass('ctrl-disabled');
				
			if (hasErrors) {
				hideAllMessages();
				jQuery('#msg-hasErrors').addClass('show-message');
						
				setTimeout(function(){ 
					jQuery('#msg-hasErrors').removeClass('show-message');
				}, 5000);
			} else {
				if (!isPuzzleSolved) {
					hideAllMessages();
					jQuery('#msg-noErrors').addClass('show-message');
							
					setTimeout(function(){ 
						jQuery('#msg-noErrors').removeClass('show-message');
					}, 5000);
				}
			}
		
		} else {
			jQuery('#ctrl-hint').addClass('ctrl-disabled');
			hasErrors = false;
		}
	}
}

function upadateStatus() {
	areAnswersNotEmpty = false;
	solvedQuestionsCount = 0;
	
	jQuery('table.cell-table td').each(function() {
		if (!jQuery(this).hasClass('hint')) {
			if (jQuery(this).find('input').val() !== '') {
				areAnswersNotEmpty = true;
				solvedQuestionsCount++;
			}
		}
	});
}

function hideAllMessages() {
	jQuery('#msg-isNaN').removeClass('show-message');
	jQuery('#msg-noErrors').removeClass('show-message');
	jQuery('#msg-hasErrors').removeClass('show-message');
	jQuery('#msg-puzzleSolved').removeClass('show-message');
}


