        function installEmojis(element = "*", size = 1.4, marginTop = 0.3) {
            if (element[0] === "#") {
                element = document.querySelector(element);
            } else {
                element = document.querySelectorAll(element);
            }
            for (let i = 0; i < element.length; i++) {
                let elm = element[i];
                const emojiRegex = /([\uD800-\uDBFF][\uDC00-\uDFFF])/;
                const textNodes = document.createTreeWalker(
                    elm,
                    NodeFilter.SHOW_TEXT,
                    null,
                    false
                );
                while (textNodes.nextNode()) {
                    const node = textNodes.currentNode;
                    let matches;
                    while ((matches = node.nodeValue.match(emojiRegex))) {
                        const emojiElement = document.createElement("img");
                        emojiElement.alt = matches[0];
                        emojiElement.src = `https://github.com/hmiddot/emoji/files/${matches[0]}.png`;
                        emojiElement.style = 'width:' + size + 'em;display:inline-block;margin-top:' + marginTop + 'em;margin-bottom:-' + marginTop + 'em';
                        const emojiIndex = node.nodeValue.indexOf(matches[0]);
                        const preMatchText = node.nodeValue.slice(0, emojiIndex);
                        const postMatchText = node.nodeValue.slice(emojiIndex + 2);
                        const preTextNode = document.createTextNode(preMatchText);
                        node.nodeValue = postMatchText;
                        node.parentNode.insertBefore(emojiElement, node);
                        node.parentNode.insertBefore(preTextNode, node);
                        textNodes.currentNode = preTextNode;
                    }
                }
            }
        }
