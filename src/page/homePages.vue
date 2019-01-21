<template>
    <div>
        <div id="app" class="container">
            <div class="col-md-10 col-md-offset-1">

                <p><br></p>
                <div class="text-center" style="text-align: center">
                    <vue2-org-tree
                        :data="data"
                        :horizontal="horizontal"
                        :collapsable="collapsable"
                        :label-class-name="labelClassName"
                        :render-content="renderContent"
                        @on-expand="onExpand"
                        @on-node-click="onNodeClick"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                data: {
                    id: 0,
                    label: '三一集团',
                    children: [{
                        id: 2,
                        label: '事业部1',
                        children: [{
                            id: 5,
                            label: '研发-前端'
                        }, {
                            id: 6,
                            label: '研发-后端'
                        }, {
                            id: 9,
                            label: 'UI设计'
                        }, {
                            id: 10,
                            label: '产品经理'
                        }]
                    }, {
                        id: 3,
                        label: '事业部2',
                        children: [{
                            id: 7,
                            label: '销售一部'
                        }, {
                            id: 8,
                            label: '销售二部'
                        }]
                    }, {
                        id: 4,
                        label: '事业部3'
                    }, {
                        id: 9,
                        label: '事业部4'
                    }]
                },
                horizontal: true,
                collapsable: true,
                expandAll: true,
                labelClassName: 'bg-white'
            }
        },

        methods: {
            renderContent: function(h, data) {
                return data.label
            },
            onExpand: function(data) {
                if ('expand' in data) {
                    data.expand = !data.expand

                    if (!data.expand && data.children) {
                        this.collapse(data.children)
                    }
                } else {
                    this.$set(data, 'expand', true)
                }
            },
            onNodeClick: function(e, data) {
                alert(data.label)
            },
            collapse: function(list) {
                var _this = this
                list.forEach(function(child) {
                    if (child.expand) {
                        child.expand = false
                    }

                    child.children && _this.collapse(child.children)
                })
            },
            expandChange: function() {
                this.toggleExpand(this.data, this.expandAll)
            },
            toggleExpand: function(data, val) {
                var _this = this
                if (Array.isArray(data)) {
                    data.forEach(function(item){
                        _this.$set(item, 'expand', val)
                        if (item.children) {
                            _this.toggleExpand(item.children, val)
                        }
                    })
                } else {
                    this.$set(data, 'expand', val)
                    if (data.children) {
                        _this.toggleExpand(data.children, val)
                    }
                }
            }
        }

    }
</script>

<style lang="less">
    @import "../assets/css/mixin.less";
    .org-tree-node-label {
        white-space: nowrap;
    }
    .bg-white {
        background-color: white;
    }
    .bg-orange {
        background-color: orange;
    }
    .bg-gold {
        background-color: gold;
    }
    .bg-gray {
        background-color: gray;
    }
    .bg-lightpink {
        background-color: lightpink;
    }
    .bg-chocolate {
        background-color: chocolate;
    }
    .bg-tomato {
        background-color: tomato;
    }
</style>
