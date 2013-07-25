(function() {
	window.xmlToJson = function(xml, json) {
		if (json === undefined) {
			json = {};
		}

		if (typeof(xml) === "string") {
			xml = (new DOMParser()).parseFromString(xml, "text/xml");
		}

		var i = 0,
			newC;
		for (; i < xml.childNodes.length; i++) {
			var childNode = xml.childNodes[i];
			if (childNode.nodeName.indexOf('#') == 0) {
				continue;
			}

			if (childNode.childNodes.length === 1 && childNode.childNodes[0].nodeName == '#text') {
				if (json.length !== undefined) {
					newC = {};
					newC[childNode.nodeName] = childNode.childNodes[0].data;
					json.push(newC);
				} else if (json[childNode.nodeName] === undefined) {
					json[childNode.nodeName] = childNode.childNodes[0].data;
				} else {
					json = [json];
					newC = {};
					newC[childNode.nodeName] = childNode.childNodes[0].data;
					json.push(newC);
				}
				continue;
			}

			var dataStructure = {};
			dataStructure = xmlToJson(childNode, dataStructure);
			if (json[childNode.nodeName] === undefined) {
				json[childNode.nodeName] = dataStructure;
			} else if (json[childNode.nodeName].length === undefined) {
				var old = json[childNode.nodeName];
				json[childNode.nodeName] = [];
				json[childNode.nodeName].push(old);
				json[childNode.nodeName].push(dataStructure);
			} else {
				json[childNode.nodeName].push(dataStructure);
			}
		}
		return json;
	};
})();