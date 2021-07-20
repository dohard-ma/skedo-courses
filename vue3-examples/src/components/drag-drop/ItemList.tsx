import classes from './drag-drop.module.scss'

const items = [
	{
		title : "图片",
		type : "image",
		default : ""
	},
	{
		title : "文字",
		type : "text",
		default : "请输入文本"
	},
	{
		title : "矩形",
		type : "rect"
	}
]
export default () => {
  return <div class={classes['item-list']}>
		{items.map(item => {
			return <div class={classes['item']} key={item.type}>{item.title}</div>
		})}
	</div>
}