((d) => {
	const $btnMenu = d.querySelector(".menu-btn");
	const $menu = d.querySelector(".menu");

	$btnMenu.addEventListener("click", (e) => {
		$btnMenu.firstElementChild.classList.toggle("none");
		$btnMenu.lastElementChild.classList.toggle("none");
		$menu.classList.toggle("is-active");
	});
	d.addEventListener("click", (e) => {
		if (!e.target.matches(".menu a")) {
			return false;
		}
		if ($menu.className.includes("is-active")) {
			setTimeout(() => {
				$btnMenu.firstElementChild.classList.remove("none");
				$btnMenu.lastElementChild.classList.add("none");
				$menu.classList.remove("is-active");
			}, 3000);
		}
		$btnMenu.firstElementChild.classList.remove("none");
		$btnMenu.lastElementChild.classList.add("none");
		$menu.classList.remove("is-active");
	});
})(document);

/* slider dinamico responsive*/
((d) => {
	const $sliders = d.querySelectorAll(".slider-slides > .slider-item");
	const $sliders_footer = d.querySelector(".slider-footer");
	const $btnLeft = d.querySelector(".btn-left");
	const $btnRight = d.querySelector(".btn-right");

	var pos_actual = -1;
	var pos_previous = -1;
	var indicator = "right";
	var slider_play = null;
	var slider_auto_play = null;
	let count_sliders = $sliders.length - 1;
	var time_slider = 5000;
	$btnLeft.addEventListener("click", (e) => {
		indicator = "left";
		if (slider_play != null) {
			clearInterval(slider_play);
			slider_play = null;
		}
		//quita el foco de un elemento que se ha seleccionado anteriormente
		this.blur();
		previous();
		slider_auto_play = setTimeout(() => {
			autoplay();
		}, time_slider);
	});
	$btnRight.addEventListener("click", (e) => {
		indicator = "right";
		if (slider_play != null) {
			clearInterval(slider_play);
			slider_play = null;
		}
		//quita el foco de un elemento que se ha seleccionado anteriormente
		this.blur();
		next();
		slider_auto_play = setTimeout(() => {
			autoplay();
		}, time_slider);
	});
	console.log($sliders);
	console.log("numero de elementos sliders: " + count_sliders);
	let $fragment = d.createDocumentFragment();

	for (pos = 0; pos <= count_sliders; pos++) {
		let $item = d.createElement("div");
		$item.classList.add("item");
		$item.classList.add("data-pot");
		$item.setAttribute("data-pot", pos);
		$item.textContent = pos + 1;
		$fragment.appendChild($item);
	}
	$sliders_footer.appendChild($fragment);
	console.log($sliders_footer);

	d.querySelectorAll(".data-pot").forEach((el) => {
		el.addEventListener("click", (e) => {
			mostrar_iterator(e.target);
		});
	});
	//play();
	autoplay();

	//mostrarItem(pos_actual);

	function mostrar_iterator(data) {
		let data_value = parseInt(data.getAttribute("data-pot"));
		console.log("Se ha clickeado el elemento: " + data);
		console.log("elemento con valor de atributo  " + data_value);

		if (data_value > pos_actual) {
			indicator = "right";
		} else if (data_value < pos_actual) {
			indicator = "left";
		} else {
			indicator = indicator; //deja el que tiene actualmente,no cambia
		}

		pos_actual = data_value;

		if (slider_play != null) {
			clearInterval(slider_play);
			slider_play = null;
		}
		mostrarItem(data_value);
		slider_auto_play = setTimeout(() => {
			autoplay();
		}, time_slider);
	}

	function next() {
		pos_previous = pos_actual;
		pos_actual++;
		if (pos_actual > count_sliders) {
			pos_actual = 0;
		}
		mostrarItem(pos_actual);
	}
	function previous() {
		pos_previous = pos_actual;
		pos_actual--;
		if (pos_actual < 0) {
			pos_actual = count_sliders;
		}
		mostrarItem(pos_actual);
	}
	function mostrarItem(pos) {
		console.log("valor anterior " + pos_previous);
		console.log("valor actual " + pos);

		removeClass($sliders, "active-fadein");
		$sliders[pos].className += " active-fadein";

		let $item = d.querySelectorAll(".item");
		removeClass($item, "active-item");
		$item[pos].className += " active-item";

		console.log("funcion fin mostrar iterartor");
	}

	function removeClass($lista, atributo) {
		let iterator_len = $lista.length;
		for (let indice = 0; indice < iterator_len; indice++) {
			if ($lista[indice].className.includes(atributo) == true) {
				let valor = $lista[indice].className.replace(atributo, "");
				$lista[indice].className = valor.trim();
				//quita el foco de un elemento que se ha seleccionado anteriormente
				$lista[indice].blur();
			}
		}
	}
	function play() {
		if (indicator == "left") {
			slider_play = setInterval(() => {
				previous();
			}, time_slider);
		} else {
			slider_play = setInterval(() => {
				next();
			}, time_slider);
		}
	}

	function autoplay() {
		if (slider_auto_play != null) {
			clearTimeout(slider_auto_play);
			slider_auto_play = null;
		}
		play();
	}
})(document);

/* Fromulario de Comentarios*/
((d) => {
	const $form = d.querySelector(".contact-form"),
		$loader = d.querySelector(".contact-form-loader"),
		$inputs = d.querySelectorAll(".contact-form [required]"),
		$response = d.querySelector(".contact-form-response");
	$inputs.forEach((input) => {
		let $span = d.createElement("span");
		$span.id = input.name;
		$span.textContent = input.title;
		$span.classList.add("contact-form-error", "none");
		input.insertAdjacentElement("afterend", $span);
	});

	d.addEventListener("keyup", (e) => {
		if (e.target.matches(".contact-form [required]")) {
			let $input = e.target,
				pattern = $input.pattern || $input.dataset.pattern;
			if (pattern && $input.value !== "") {
				let regex = new RegExp(pattern);
				let $span = d.getElementById($input.name);
				if (!regex.exec($input.value)) {
					$input.classList.add("input-target");
				} else {
					$input.classList.remove("input-target");
				}
				return !regex.exec($input.value)
					? $span.classList.add("is-active")
					: $span.classList.remove("is-active");
			}
			if (!pattern) {
				let $span = d.getElementById($input.name);
				return $input.value === ""
					? $span.classList.add("is-active")
					: $span.classList.remove("is-active");
			}
		}
	});

	var $modal = d.querySelector(".modal#gracias");

	$form.addEventListener("submit", (e) => {
		e.preventDefault();
		$loader.classList.remove("none");
		fetch("https://formsubmit.co/ajax/luzuluis@hotmail.com", {
			method: "POST",
			body: new FormData(e.target),
		})
			.then((res) => {
				res.ok ? res.json() : Promise.reject(res);
			})
			.then((json) => {
				console.log(json);
				$modal.style.opacity = 1;
				$modal.style["pointer-events"] = "auto";

				$form.reset();
			})
			.catch((err) => {
				console.log(err);
				let message =
					err.statusText || "Ocurrio un error al enviar,intenta nuevamente ";
				$response.querySelector(
					"h3"
				).innerHTML = `Error  ${err.status} : ${message}`;
			})
			.finally(() => {
				$loader.classList.add("none");
				setTimeout(() => {
					/*$modal.setAttribute("opacity", 0);
					$modal.setAttribute("pointer-events", none);*/
					$modal.style.opacity = 0;
					$modal.style.pointerEvents = "none";
				}, 3000);
			});
	});
})(document);

/*
function validarEmail(valor) {
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/.test(valor)) {
		alert("La dirección de email " + valor + " es correcta.");
	} else {
		alert("La dirección de email es incorrecta.");
	}
}

Esto es una prueba de envio de comentarios desde mi pagina web Portafolio-CV

Hola Luis Antonio te queria preguntar si puedes hacer una web utilizando solo HTML%,Css,,Javascript y PHP y de base de datos MYSQL,gracias!!

*/
