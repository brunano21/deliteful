/** @module deliteful/list/ItemRenderer */
define(["dcl/dcl",
        "delite/register",
        "./Renderer"
], function (dcl, register, Renderer) {

	/**
	 * Default item renderer for the {@link module:deliteful/list/List deliteful/list/List widget}.
	 * 
	 * This renderer renders generic items that can have any of the following attributes (display
	 * position of the rendering described for LTR direction):
	 * - `iconclass`: css class to apply to a DIV element on the left side of the list item in order
	 * to display an icon.
	 * Rendered with CSS class `d-list-item-icon` + the value of the attribute;
	 * - `label`: string to render on the left side of the node, after the icon.
	 * Rendered with CSS class `d-list-item-label`;
	 * - `righttext`: string to render of the right side if the node.
	 * Rendered with CSS class `d-list-item-right-text`;
	 * - `righticonclass`: css class to apply to a DIV element on the right side of the list item
	 * in order to display an icon.
	 * Rendered with CSS class `d-list-item-right-icon2` + the value of the attribute;
	 * By default, none of the nodes that renders the attributes are focusable with keyboard navigation
	 * (no navindex attribute on the nodes). 
	 * @class module:deliteful/list/ItemRenderer
	 * @augment module:deliteful/list/Renderer
	 */
	var ItemRenderer = dcl(Renderer, /** @lends module:deliteful/list/ItemRenderer# */ {

		/**
		 * CSS class of an item renderer. This value is expected by the
		 * {@link module:deliteful/list/List deliteful/list/List widget}
		 * so it must not be changed.
		 * @member {string}
		 * @protected
		 */
		baseClass: "d-list-item",

		/**
		 * A dom node we use to push elements to the left or right
		 * of the renderer node (flex layout).
		 * @member {DOMNode} _spacerNode
		 * @private
		 */

		//////////// PROTECTED METHODS ///////////////////////////////////////

		/**
		 * Renders the item inside this.renderNode.
		 * @protected
		 */
		render: function () {
			while (this.renderNode.children[0]) {
				this.renderNode.removeChild(this.renderNode.children[0]);
			}
			this._renderNode("icon", "iconNode", this.item.iconclass, "d-list-item-icon");
			this._renderNode("text", "labelNode", this.item.label, "d-list-item-label");
			this._spacerNode = this.ownerDocument.createElement("DIV");
			this._spacerNode.className = "d-spacer";
			this.renderNode.appendChild(this._spacerNode);
			this._renderNode("text", "righttextNode", this.item.righttext, "d-list-item-right-text");
			this._renderNode("icon", "righticonNode", this.item.righticonclass, "d-list-item-right-icon");
		},

		//////////// PRIVATE METHODS ///////////////////////////////////////

		/**
		 * Renders a node.
		 * @param {string} nodeType` "text"` for a text node, `"icon"` for an icon node.
		 * @param {string} nodeName The name of the property to use to store a reference to the node in the renderer.
		 * @param {string} data The data to render (`null` or `undefined` if there is no data and the node should be
		 * deleted).
		 * For a nodeType of `"text"`, data is the text to render.
		 * For a nodeType of `"icon"`, data is the extra class to apply to the node
		 * @param {string} nodeClass Base CSS class for the node.
		 * @private
		 */
		_renderNode: function (nodeType, nodeName, data, nodeClass) {
			if (data != null) {
				this[nodeName] = this.ownerDocument.createElement("DIV");
				this[nodeName].className = nodeClass;
				this.renderNode.appendChild(this[nodeName]);
				if (nodeType === "text") {
					this[nodeName].innerHTML = data;
				} else {
					this[nodeName].className = nodeClass + " " + data;
				}
			} else {
				if (this[nodeName]) {
					delete this[nodeName];
				}
			}
		}
	});

	return register("d-list-item-renderer", [HTMLElement, ItemRenderer]);
});