function codeBlock(code) {
	const COUNT_LINE = 2;
	const btn = code.querySelector('.code__copy');
	const pre = code.querySelector('pre');
	let textPre = pre.innerText;
	let countCode = '';
	const preView = document.createElement('code');
	const buttonView = document.createElement('button');

	createCodeView();

	if (countCode > COUNT_LINE)
		limitHeight();

	btn.addEventListener('click', function () {
		copyText();
	});

	buttonView.addEventListener('click', function () {
		preView.style.height = `${20 * (countCode + 1)}px`;
		code.classList.remove('hide');

		const bodyStyles = window.getComputedStyle(document.body);
		const transitionDuration = 1.5 * bodyStyles.getPropertyValue('--transition-duration').replace("ms", "");
		window.setTimeout(() => {
			buttonView.style.display = 'none';
		}, transitionDuration)
	});

	function limitHeight() {
		preView.style.height = `${20 * COUNT_LINE}px`;
		createButtonView();
		code.classList.add('hide')
	}

	function createButtonView() {
		buttonView.classList.add('code__button-view');
		buttonView.type = 'button'
		buttonView.innerHTML = `<svg aria-label="Показать весь код" role="img" width="12" height="8"><path d="M6 4.83 10.24.59 11.66 2 7.4 6.24 6 7.66.34 2 1.76.59 6 4.83z"/></svg>`;
		code.append(buttonView);
	}

	function createCodeView() {
		const textPreArr = textPre.split('\n');
		let textCode = '';

		for (let i = 0; i < textPreArr.length; i++) {
			textCode += `<codeline class="codeline"><codenumber class="codenumber" aria-hidden="true">${i + 1}</codenumber> ${textPreArr[i].replace('<', '&lt;').replace('</', '&lt;/').replace('>', '&gt;')}</codeline>`;
		}

		textCode += `<codeline class="codeline"><codenumber class="codenumber" aria-hidden="true">${textPreArr.length + 1}</codenumber></codeline>`;

		preView.classList.add('code__pre');
		preView.innerHTML = textCode;
		pre.innerHTML = '';
		pre.append(preView);

		return countCode = textPreArr.length, preView;
	}

	function copyText() {
		navigator.clipboard.writeText(textPre)
			.then(() => {
				const chips = new BoltChips({
					message: 'Скопировано',
					cssClass: 'bolt-chips--success',
				});
			})
			.catch(err => {
				const chips = new BoltChips({
					message: err,
					cssClass: 'bolt-chips--danger'
				});
			});
	}
}

window.addEventListener('load', () => {
	const arrCodeBlock = document.querySelectorAll('.code');
	for (let i = 0; i < arrCodeBlock.length; i++) {
		codeBlock(arrCodeBlock[i]);
	}
});
